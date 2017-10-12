const sortMessages = require('./sortMessages');

function reduceDeviceHistory(history, message) {
  const { device } = message;
  const deviceHistory = history[device] || [];
  deviceHistory.push(message);
  return Object.assign({}, history, { [device]: deviceHistory });
}

function getDeviceOoos(device, history) {
  const ooos = [];
  let last;
  for (let i = 0; i < history.length; i += 1) {
    const { type: next } = history[i];
    if (next === last) {
      const ooo = {
        device,
        last,
        next,
        lastMessage: history[i - 1],
        nextMessage: history[i],
      };
      ooos.push(ooo);
    }
    last = next;
  }
  return ooos;
}


function getOoos(messages) {
  const sorted = sortMessages(messages);
  const history = sorted.reduce(reduceDeviceHistory, {});
  const ooos = Object
    .keys(history)
    .map(device => getDeviceOoos(device, history[device]))
    .filter(o => o.length > 0);
  return [].concat(...ooos);
}

module.exports = getOoos;
