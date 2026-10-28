const express = require('express');
const crypto = require('crypto');
const { charges } = require('../lib/db');
const log = require('../lib/log');

const router = express.Router();

router.post('/', (req, res) => {
  const { amountCents, currency = 'usd', card } = req.body || {};
  if (!Number.isInteger(amountCents) || amountCents <= 0) return res.status(400).json({ error: 'amountCents must be a positive integer' });
  if (!card || !/^\d{12,19}$/.test(card.number || '')) return res.status(400).json({ error: 'card.number required' });
  const charge = {
    id: 'ch_' + crypto.randomBytes(6).toString('hex'),
    merchantId: req.merchant.id,
    amountCents,
    refundedCents: 0,
    currency,
    last4: card.number.slice(-4),
    status: 'succeeded',
  };
  charges.set(charge.id, charge);
  log.info('charge.created', { id: charge.id, merchant: charge.merchantId, amountCents, last4: charge.last4 });
  res.status(201).json(charge);
});

router.get('/:id', (req, res) => {
  const charge = charges.get(req.params.id);
  if (!charge || charge.merchantId !== req.merchant.id) return res.status(404).json({ error: 'not found' });
  res.json(charge);
});

module.exports = router;
