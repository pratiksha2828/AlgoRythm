// {
//   "type": "webhook",
//   "meta": {
//     "bucked_id": "1593fe5f-45f9-45cc-ba23-675fdc7c1638", 
//     "bucket_name": "my-1-bucket-name",                                
//     "input_id": "b90f2fe9-621d-4290-9e74-edd5b61325dd",
//     "input_name": "Default public endpoint",
//     "output_name": "111",
//     "output_destination": "http://localhost:8080"
//   },
//   "headers": {
//     "Content-Type": [
//       "application/json"
//     ]
//   },
//   "query": "foo=bar",
//   "body": "{\"hi\": \"there\"}",
//   "method": "PUT"
// }
// Corrected WebhookRelayEvent.ts

export interface Metadata {
    id: string;
    bucket_id: string;
    bucket_name: string;
    input_id: string;
    input_name: string;
    output_name: string;
    output_destination: string;
}

export interface Headers {
    headers: any;
}

export interface Event {
    type: string;
    status: string;
    message: string;
    meta: Metadata;
    headers: Headers;
    query: string;
    body: string;
    method: string;
}

export default class SubscriptionMessage {
    constructor(
        private type: string,
        private status: string,
        private message: string,
        private meta: Metadata,
        private _headers: Headers,
        private _query: string,
        private _body: string,
        private _method: string
    ) {}

    getBucketName(): string {
        return this.meta.bucket_id;
    }

    getType(): string {
        return this.type;
    }

    getStatus(): string {
        return this.status;
    }

    getMessage(): string {
        return this.message;
    }

    getHeaders(): Headers {
        return this._headers;
    }

    getQuery(): string {
        return this._query;
    }

    getBody(): string {
        return this._body;
    }

    getMethod(): string {
        return this._method;
    }

    static fromJSON(json: any): SubscriptionMessage {
        const msg = Object.create(SubscriptionMessage.prototype);
        return Object.assign(msg, json);
    }
}

export class ResponseMessage {
    constructor(
        private meta: Metadata,
        private status: number,
        private headers: Headers,
        private body: string
    ) {}

    getMeta(): Metadata {
        return this.meta;
    }

    getStatus(): number {
        return this.status;
    }

    getHeaders(): Headers {
        return this.headers;
    }

    getBody(): string {
        return this.body;
    }

    static fromJSON(json: any): ResponseMessage {
        const msg = Object.create(ResponseMessage.prototype);
        return Object.assign(msg, json);
    }
}

export { SubscriptionMessage }
