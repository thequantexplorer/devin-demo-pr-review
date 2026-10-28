process.env.NODE_ENV = 'test';
const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

const auth = { Authorization: 'Bearer sk_test_acme' };

test('creates a charge and stores only last4', async () => {
  const res = await request(createApp()).post('/v1/charges').set(auth).send({ amountCents: 2500, card: { number: '4242424242424242' } });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.last4, '4242');
  assert.strictEqual(res.body.number, undefined);
});

test('merchants cannot read each other\'s charges', async () => {
  const app = createApp();
  const created = await request(app).post('/v1/charges').set(auth).send({ amountCents: 100, card: { number: '4242424242424242' } });
  const res = await request(app).get('/v1/charges/' + created.body.id).set({ Authorization: 'Bearer sk_test_globex' });
  assert.strictEqual(res.status, 404);
});

test('rejects missing api key', async () => {
  const res = await request(createApp()).post('/v1/charges').send({});
  assert.strictEqual(res.status, 401);
});
