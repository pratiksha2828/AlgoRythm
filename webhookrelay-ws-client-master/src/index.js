"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
console.log('Starting index.ts execution...');
// Load environment variables from .env located in the project root
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Log to check .env values
console.log("RELAY_KEY:", process.env.RELAY_KEY);
console.log("RELAY_SECRET:", process.env.RELAY_SECRET);
const WebsocketClient_1 = __importDefault(require("./WebsocketClient"));
const relayKey = process.env.RELAY_KEY || '';
const relaySecret = process.env.RELAY_SECRET || '';
const buckets = ['AlgoRythm']; // Change if needed
if (!relayKey || !relaySecret) {
    console.error('Missing RELAY_KEY or RELAY_SECRET in environment variables');
    process.exit(1);
}
const client = new WebsocketClient_1.default(relayKey, relaySecret, buckets, (msg) => {
    console.log('Webhook received:', msg);
});
console.log('Connecting to WebhookRelay...');
client.connect();
