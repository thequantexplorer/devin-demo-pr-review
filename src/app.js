const express = require('express');
const { requireMerchant } = require('./lib/auth');

function createApp() {
  const app = express();
  app.use('/v1/webhooks', require('./routes/webhooks'));
  app.use(express.json());
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/v1/charges', requireMerchant, require('./routes/charges'));
  app.use('/v1/refunds', requireMerchant, require('./routes/refunds'));
  return app;
}

module.exports = { createApp };
