"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionMessage = exports.ResponseMessage = void 0;
class SubscriptionMessage {
    constructor(type, status, message, meta, _headers, _query, _body, _method) {
        this.type = type;
        this.status = status;
        this.message = message;
        this.meta = meta;
        this._headers = _headers;
        this._query = _query;
        this._body = _body;
        this._method = _method;
    }
    getBucketName() {
        return this.meta.bucket_id;
    }
    getType() {
        return this.type;
    }
    getStatus() {
        return this.status;
    }
    getMessage() {
        return this.message;
    }
    getHeaders() {
        return this._headers;
    }
    getQuery() {
        return this._query;
    }
    getBody() {
        return this._body;
    }
    getMethod() {
        return this._method;
    }
    static fromJSON(json) {
        const msg = Object.create(SubscriptionMessage.prototype);
        return Object.assign(msg, json);
    }
}
exports.default = SubscriptionMessage;
exports.SubscriptionMessage = SubscriptionMessage;
class ResponseMessage {
    constructor(meta, status, headers, body) {
        this.meta = meta;
        this.status = status;
        this.headers = headers;
        this.body = body;
    }
    getMeta() {
        return this.meta;
    }
    getStatus() {
        return this.status;
    }
    getHeaders() {
        return this.headers;
    }
    getBody() {
        return this.body;
    }
    static fromJSON(json) {
        const msg = Object.create(ResponseMessage.prototype);
        return Object.assign(msg, json);
    }
}
exports.ResponseMessage = ResponseMessage;
