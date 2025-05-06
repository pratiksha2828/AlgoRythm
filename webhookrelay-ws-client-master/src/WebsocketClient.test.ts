import WebhookRelayClient from './WebsocketClient';
import axios from 'axios';
import * as chai from 'chai';

const expect = chai.expect;

// Validate env variables early
const key = process.env.RELAY_KEY!;
const secret = process.env.RELAY_SECRET!;
const testBucket = process.env.RELAY_BUCKET!;
const responsiveTestBucket = process.env.RELAY_RESPONSIVE_BUCKET!;

describe('Connect to WHR', () => {
  it('should be able to subscribe correctly', (done) => {
    const handler = (data: string) => {
      const msg = JSON.parse(data);
      if (msg.type === 'status' && msg.status === 'subscribed') {
        expect(msg.message).to.include(testBucket);
        client.disconnect();
        done();
      }
    };

    const client = new WebhookRelayClient(key, secret, [testBucket], handler);
    client.connect();
  });

  it('should be able to forward the webhook', (done) => {
    const payload = `payload-${Math.floor(Math.random() * 100000) + 1}`;

    const handler = (data: string) => {
      const msg = JSON.parse(data);
      if (msg.type === 'status' && msg.status === 'subscribed') {
        setTimeout(() => {
          axios.post('https://my.webhookrelay.com/v1/webhooks/9c1f0997-1a34-4357-8a88-87f604daeca9', payload)
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

    const client = new WebhookRelayClient(key, secret, [testBucket], handler);
    client.connect();
  });

  it('should send custom response to the webhook', (done) => {
    const responder = new WebhookRelayClient(key, secret);
    const payload = `payload-${Math.floor(Math.random() * 100000) + 1}`;

    const handler = (data: string) => {
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

    const responsiveClient = new WebhookRelayClient(key, secret, [responsiveTestBucket], handler);
    responsiveClient.connect();

    setTimeout(() => {
      axios.post('https://my.webhookrelay.com/v1/webhooks/6b337226-a24b-4a78-9323-c5a402cd08cb', payload)
        .then((response) => {
          expect(response.status).to.equal(201);
          expect(response.data).to.equal('banana');
          done();
        });
    }, 1000);
  });
});
