function info(msg, fields = {}) {
  if (process.env.NODE_ENV === 'test') return;
  console.log(JSON.stringify({ level: 'info', msg, ...fields }));
}
module.exports = { info };
