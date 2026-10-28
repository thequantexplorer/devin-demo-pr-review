const { merchants } = require('./db');

function requireMerchant(req, res, next) {
  const header = req.get('authorization') || '';
  const key = header.replace(/^Bearer /, '');
  const merchant = [...merchants.values()].find((m) => m.apiKey === key);
  if (!merchant) return res.status(401).json({ error: 'invalid api key' });
  req.merchant = merchant;
  next();
}

module.exports = { requireMerchant };
