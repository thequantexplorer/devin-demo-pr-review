const express = require('express');
const { requireMerchant } = require('./lib/auth');

function createApp() {
  const app = express();
  app.use(express.json());
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/v1/charges', requireMerchant, require('./routes/charges'));
  return app;
}

module.exports = { createApp };
