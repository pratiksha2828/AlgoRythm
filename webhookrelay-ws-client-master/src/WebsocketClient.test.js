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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebsocketClient_1 = __importDefault(require("./WebsocketClient"));
const axios_1 = __importDefault(require("axios"));
const chai = __importStar(require("chai"));
const expect = chai.expect;
// Validate env variables early
const key = process.env.RELAY_KEY;
const secret = process.env.RELAY_SECRET;
const testBucket = process.env.RELAY_BUCKET;
const responsiveTestBucket = process.env.RELAY_RESPONSIVE_BUCKET;
describe('Connect to WHR', () => {
    it('should be able to subscribe correctly', (done) => {
        const handler = (data) => {
            const msg = JSON.parse(data);
            if (msg.type === 'status' && msg.status === 'subscribed') {
                expect(msg.message).to.include(testBucket);
                client.disconnect();
                done();
            }
        };
        const client = new WebsocketClient_1.default(key, secret, [testBucket], handler);
        client.connect();
    });
    it('should be able to forward the webhook', (done) => {
        const payload = `payload-${Math.floor(Math.random() * 100000) + 1}`;
        const handler = (data) => {
            const msg = JSON.parse(data);
            if (msg.type === 'status' && msg.status === 'subscribed') {
                setTimeout(() => {
                    axios_1.default.post('https://my.webhookrelay.com/v1/webhooks/9c1f0997-1a34-4357-8a88-87f604daeca9', payload)
                        .then((response) => {
                        expect(response.status).to.equal(200);
                    });
                }, 1000);
            }
            if (msg.type === 'webhook' && msg.body === payload) {
                expect(msg.method).to.equal('POST');
                client.disconnect();
                done();
            }
        };
        const client = new WebsocketClient_1.default(key, secret, [testBucket], handler);
        client.connect();
    });
    it('should send custom response to the webhook', (done) => {
        const responder = new WebsocketClient_1.default(key, secret);
        const payload = `payload-${Math.floor(Math.random() * 100000) + 1}`;
        const handler = (data) => {
            const msg = JSON.parse(data);
            if (msg.type === 'webhook' && msg.body === payload) {
                responder.respond({
                    meta: msg.meta,
                    status: 201,
                    body: 'banana',
                    headers: { xkey: ['xvalue'] }
                });
                expect(msg.method).to.equal('POST');
                responsiveClient.disconnect();
            }
        };
        const responsiveClient = new WebsocketClient_1.default(key, secret, [responsiveTestBucket], handler);
        responsiveClient.connect();
        setTimeout(() => {
            axios_1.default.post('https://my.webhookrelay.com/v1/webhooks/6b337226-a24b-4a78-9323-c5a402cd08cb', payload)
                .then((response) => {
                expect(response.status).to.equal(201);
                expect(response.data).to.equal('banana');
                done();
            });
        }, 1000);
    });
});
