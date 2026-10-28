const { createApp } = require('./app');
const port = process.env.PORT || 4300;
createApp().listen(port, () => console.log('payments-gateway on :' + port));
