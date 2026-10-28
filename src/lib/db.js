// In-memory stand-in for the payments Postgres schema.
const charges = new Map();
const refunds = new Map();
const merchants = new Map([
  ['m_acme', { id: 'm_acme', apiKey: 'sk_test_acme', webhookSecret: 'whsec_acme_demo' }],
  ['m_globex', { id: 'm_globex', apiKey: 'sk_test_globex', webhookSecret: 'whsec_globex_demo' }],
]);
module.exports = { charges, refunds, merchants };
