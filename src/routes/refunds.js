const express = require('express');
const crypto = require('crypto');
const { charges, refunds } = require('../lib/db');
const log = require('../lib/log');

const router = express.Router();

// POST /v1/refunds { chargeId, amountCents, reason }
router.post('/', (req, res) => {
  const { chargeId, amountCents, reason } = req.body || {};
  const charge = charges.get(chargeId);
  if (!charge) return res.status(404).json({ error: 'charge not found' });
  if (!Number.isInteger(amountCents) || amountCents <= 0) return res.status(400).json({ error: 'amountCents must be positive' });

  const refund = {
    id: 're_' + crypto.randomBytes(6).toString('hex'),
    chargeId,
    amountCents,
    reason: reason || 'requested_by_customer',
    status: 'succeeded',
  };
  charge.refundedCents += amountCents;
  if (charge.refundedCents === charge.amountCents) charge.status = 'refunded';
  refunds.set(refund.id, refund);
  log.info('refund.created', { refund, charge });
  res.status(201).json(refund);
});

module.exports = router;
