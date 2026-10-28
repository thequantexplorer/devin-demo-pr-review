# acme-payments-gateway

Thin gateway in front of Acme's card processor. Merchants call it with an API key; the processor calls back via signed webhooks.

```sh
npm install && npm test
npm start   # :4300
```

Rules of the road (PCI):
- Never log or return full card numbers (PAN). Store `last4` only.
- Every merchant-scoped read/write must check `merchantId`.
- Webhook signatures are HMAC-SHA256 over the raw body, compared in constant time.
- Refunds can never exceed the captured amount.

---

This repo is a starter for a Devin demo. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for setup and the prompt.
