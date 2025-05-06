import * as httpm from 'typed-rest-client/HttpClient';
import * as hm from 'typed-rest-client/Handlers';
import { Logger, transports, createLogger } from 'winston';
import { SubscriptionMessage, ResponseMessage } from './Messages/WebhookRelayEvent';

const WebSocket = require('universal-websocket-client');

export default class WebhookRelayClient {
    private _socket?: WebSocket;
    private _logger: Logger;

    private _key: string = '';
    private _secret: string = '';
    private _buckets: string[] = [];
    private _api: string = 'https://my.webhookrelay.com';

    private _handler!: (data: string) => void;

    private _connecting: boolean = false;
    private _manualDisconnect: boolean = false;
    private _connected: boolean = false;
    private _reconnectInterval: number = 1000 * 3;
    private _missingPingThreshold: number = 90000;
    private _countdownTimeout!: NodeJS.Timeout;

    constructor(key: string, secret: string, buckets?: string[], handler?: (data: string) => void) {
        this._key = key;
        this._secret = secret;
        this._buckets = buckets || [];
        this._handler = handler || (() => { });

        this._logger = createLogger({
            transports: [new transports.Console()]
        });
    }

    async connect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this._connected) {
                resolve();
                return;
            }

            this._connecting = true;
            this._socket = new WebSocket('wss://my.webhookrelay.com/v1/socket');

            if (!this._socket) {
                reject(new Error("WebSocket failed to initialize"));
                return;
            }

            this._socket.onopen = () => {
                this._connected = true;
                this._connecting = false;
                this._sendMessage({ action: 'auth', key: this._key, secret: this._secret });
                resolve();
            };

            this._socket.onmessage = (event: MessageEvent) => {
                this._receiveMessage(event.data);
            };

            this._socket.onerror = (event: Event) => {
                this._logger.error(`WebSocket error: ${event}`);
            };

            this._socket.onclose = () => {
                this._socket = undefined;
                this._connected = false;
                this._connecting = false;

                if (this._manualDisconnect) {
                    this._logger.info('Manual disconnect');
                    return;
                }

                this._logger.info('Connection closed, reconnecting...');
                setTimeout(() => this._reconnect(), this._reconnectInterval);
            };
        });
    }

    async respond(responseJSON: any): Promise<void> {
        try {
            if (!responseJSON || Object.keys(responseJSON).length === 0) {
                console.error('Response message cannot be empty');
                return;
            }

            const response = ResponseMessage.fromJSON(responseJSON);
            const meta = response.getMeta();

            if (!meta) {
                console.error('Response meta property is missing.');
                return;
            }

            if (!meta.id) {
                console.error('Response meta.id cannot be empty.');
                return;
            }

            const payload = {
                id: meta.id,
                bucket_id: meta.bucket_id,
                response_body: Buffer.from(response.getBody()).toString('base64'),
                status_code: response.getStatus(),
                response_headers: response.getHeaders()
            };

            const basicHandler = new hm.BasicCredentialHandler(this._key, this._secret);
            const httpClient = new httpm.HttpClient('webhookrelay-ws-client', [basicHandler]);
            const res = await httpClient.put(`${this._api}/v1/logs/${payload.id}`, JSON.stringify(payload));

            if (res.message.statusCode !== 200) {
                const body = await res.readBody();
                console.error(`Unexpected response (${res.message.statusCode}): ${body}`);
            }
        } catch (err: any) {
            console.error(`Failed: ${err.message}`);
        }
    }

    protected beginCountdown(): void {
        clearTimeout(this._countdownTimeout);
        this._countdownTimeout = setTimeout(() => {
            this._logger.warn('Pings are missing, reconnecting...');
            this._connected = false;
            this._socket?.close();
        }, this._missingPingThreshold);
    }

    disconnect(): void {
        clearTimeout(this._countdownTimeout);
        this._disconnect();
    }

    protected get isConnecting(): boolean {
        return this._connecting;
    }

    protected get isConnected(): boolean {
        return this._connected;
    }

    private _disconnect(): void {
        this._connected = false;
        if (this._socket) {
            this._manualDisconnect = true;
            this._socket.close();
        }
    }

    private async _reconnect(): Promise<void> {
        this._connected = false;
        if (this._socket) {
            this._socket.close();
        }
        await this.connect();
    }

    private _sendMessage(obj: any): void {
        if (this._socket && this._connected) {
            try {
                this._socket.send(JSON.stringify(obj));
            } catch (e) {
                this._logger.error('Error while sending message:', e);
            }
        } else {
            this._logger.warn('Attempted to send a message on a closed WebSocket');
        }
    }

    private _receiveMessage(dataStr: string): void {
        const msg = SubscriptionMessage.fromJSON(JSON.parse(dataStr));

        if (msg.getType() === 'status' && msg.getStatus() === 'authenticated') {
            this._sendMessage({ action: 'subscribe', buckets: this._buckets });
            return;
        }

        this.beginCountdown();

        switch (msg.getType()) {
            case 'status':
                if (msg.getStatus() === 'authenticated') {
                    this._sendMessage({ action: 'subscribe', buckets: this._buckets });
                } else if (msg.getStatus() === 'subscribed') {
                    this._logger.info('Subscribed to webhook stream successfully');
                } else if (msg.getStatus() === 'ping') {
                    this._sendMessage({ action: 'pong' });
                    return;
                } else if (msg.getStatus() === 'unauthorized') {
                    this._logger.error(`Authorization failed with key: ${this._key}`);
                }
                this._handler(dataStr);
                break;
            case 'webhook':
                this._handler(dataStr);
                break;
            default:
                this._logger.warn(`Unknown message type: ${msg.getType()}`);
                this._handler(dataStr);
                break;
        }
    }
}
