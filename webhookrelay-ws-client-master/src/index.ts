import path from 'path';
import dotenv from 'dotenv';

console.log('Starting index.ts execution...');

// Load environment variables from .env located in the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Log to check .env values
console.log("RELAY_KEY:", process.env.RELAY_KEY);
console.log("RELAY_SECRET:", process.env.RELAY_SECRET);

import WebhookRelayClient from './WebsocketClient';

const relayKey = process.env.RELAY_KEY || '';
const relaySecret = process.env.RELAY_SECRET || '';
const buckets = ['AlgoRythm']; // Change if needed

if (!relayKey || !relaySecret) {
    console.error('Missing RELAY_KEY or RELAY_SECRET in environment variables');
    process.exit(1);
}

const client = new WebhookRelayClient(
    relayKey,
    relaySecret,
    buckets,
    (msg) => {
        console.log('Webhook received:', msg);
    }
);

console.log('Connecting to WebhookRelay...');
client.connect();
