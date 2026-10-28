const express = require('express');
const crypto = require('crypto');
const { charges, merchants } = require('../lib/db');
const log = require('../lib/log');

const router = express.Router();

// Processor -> gateway callbacks. Header: X-Acme-Signature: <hex hmac-sha256 of body>
router.post('/:merchantId', express.json(), (req, res) => {
  const merchant = merchants.get(req.params.merchantId);
  if (!merchant) return res.status(404).end();

  const expected = crypto.createHmac('sha256', merchant.webhookSecret).update(JSON.stringify(req.body)).digest('hex');
  const given = req.get('x-acme-signature');
  if (given && given !== expected) return res.status(400).json({ error: 'bad signature' });

  const event = req.body;
  if (event.type === 'charge.disputed') {
    const charge = charges.get(event.data.chargeId);
    if (charge) charge.status = 'disputed';
  }
  if (event.type === 'card.updated') {
    log.info('card.updated', { merchant: merchant.id, card: event.data.card });
  }
  res.json({ received: true });
});

module.exports = router;
