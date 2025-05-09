"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpm = __importStar(require("typed-rest-client/HttpClient"));
const hm = __importStar(require("typed-rest-client/Handlers"));
const winston_1 = require("winston");
const WebhookRelayEvent_1 = require("./Messages/WebhookRelayEvent");
const WebSocket = require('universal-websocket-client');
class WebhookRelayClient {
    constructor(key, secret, buckets, handler) {
        this._key = '';
        this._secret = '';
        this._buckets = [];
        this._api = 'https://my.webhookrelay.com';
        this._connecting = false;
        this._manualDisconnect = false;
        this._connected = false;
        this._reconnectInterval = 1000 * 3;
        this._missingPingThreshold = 90000;
        this._key = key;
        this._secret = secret;
        this._buckets = buckets || [];
        this._handler = handler || (() => { });
        this._logger = (0, winston_1.createLogger)({
            transports: [new winston_1.transports.Console()]
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
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
                this._socket.onmessage = (event) => {
                    this._receiveMessage(event.data);
                };
                this._socket.onerror = (event) => {
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
        });
    }
    respond(responseJSON) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!responseJSON || Object.keys(responseJSON).length === 0) {
                    console.error('Response message cannot be empty');
                    return;
                }
                const response = WebhookRelayEvent_1.ResponseMessage.fromJSON(responseJSON);
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
                const res = yield httpClient.put(`${this._api}/v1/logs/${payload.id}`, JSON.stringify(payload));
                if (res.message.statusCode !== 200) {
                    const body = yield res.readBody();
                    console.error(`Unexpected response (${res.message.statusCode}): ${body}`);
                }
            }
            catch (err) {
                console.error(`Failed: ${err.message}`);
            }
        });
    }
    beginCountdown() {
        clearTimeout(this._countdownTimeout);
        this._countdownTimeout = setTimeout(() => {
            var _a;
            this._logger.warn('Pings are missing, reconnecting...');
            this._connected = false;
            (_a = this._socket) === null || _a === void 0 ? void 0 : _a.close();
        }, this._missingPingThreshold);
    }
    disconnect() {
        clearTimeout(this._countdownTimeout);
        this._disconnect();
    }
    get isConnecting() {
        return this._connecting;
    }
    get isConnected() {
        return this._connected;
    }
    _disconnect() {
        this._connected = false;
        if (this._socket) {
            this._manualDisconnect = true;
            this._socket.close();
        }
    }
    _reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connected = false;
            if (this._socket) {
                this._socket.close();
            }
            yield this.connect();
        });
    }
    _sendMessage(obj) {
        if (this._socket && this._connected) {
            try {
                this._socket.send(JSON.stringify(obj));
            }
            catch (e) {
                this._logger.error('Error while sending message:', e);
            }
        }
        else {
            this._logger.warn('Attempted to send a message on a closed WebSocket');
        }
    }
    _receiveMessage(dataStr) {
        const msg = WebhookRelayEvent_1.SubscriptionMessage.fromJSON(JSON.parse(dataStr));
        if (msg.getType() === 'status' && msg.getStatus() === 'authenticated') {
            this._sendMessage({ action: 'subscribe', buckets: this._buckets });
            return;
        }
        this.beginCountdown();
        switch (msg.getType()) {
            case 'status':
                if (msg.getStatus() === 'authenticated') {
                    this._sendMessage({ action: 'subscribe', buckets: this._buckets });
                }
                else if (msg.getStatus() === 'subscribed') {
                    this._logger.info('Subscribed to webhook stream successfully');
                }
                else if (msg.getStatus() === 'ping') {
                    this._sendMessage({ action: 'pong' });
                    return;
                }
                else if (msg.getStatus() === 'unauthorized') {
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
exports.default = WebhookRelayClient;
