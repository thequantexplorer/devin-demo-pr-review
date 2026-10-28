process.env.NODE_ENV = 'test';
const test = require('node:test');
const assert = require('node:assert');
const crypto = require('crypto');
const request = require('supertest');
const { createApp } = require('../src/app');

const auth = { Authorization: 'Bearer sk_test_acme' };

test('partial then full refund marks the charge refunded', async () => {
  const app = createApp();
  const ch = await request(app).post('/v1/charges').set(auth).send({ amountCents: 1000, card: { number: '4242424242424242' } });
  await request(app).post('/v1/refunds').set(auth).send({ chargeId: ch.body.id, amountCents: 400 });
  const r = await request(app).post('/v1/refunds').set(auth).send({ chargeId: ch.body.id, amountCents: 600 });
  assert.strictEqual(r.status, 201);
  const after = await request(app).get('/v1/charges/' + ch.body.id).set(auth);
  assert.strictEqual(after.body.status, 'refunded');
});

test('webhook with a valid signature is accepted', async () => {
  const body = { type: 'charge.disputed', data: { chargeId: 'ch_x' } };
  const sig = crypto.createHmac('sha256', 'whsec_acme_demo').update(JSON.stringify(body)).digest('hex');
  const res = await request(createApp()).post('/v1/webhooks/m_acme').set('x-acme-signature', sig).send(body);
  assert.strictEqual(res.status, 200);
});
