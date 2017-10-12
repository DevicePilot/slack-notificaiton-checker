const { specifications } = require('../config');

function parseSpecification(specification) {
  const { regex, index = 1, none = undefined } = specification;
  const re = regex instanceof RegExp ? regex : new RegExp(regex);
  return text => (text.match(re) || [])[index] || none;
}

function parseSpecifications() {
  const { time, device, type } = specifications;
  return {
    getTime: parseSpecification(time),
    getDevice: parseSpecification(device),
    getType: parseSpecification(type),
  };
}


function parseMessage(message, specification) {
  const { getTime, getDevice, getType } = specification;
  const { text } = message;
  return ({
    time: getTime(text),
    device: getDevice(text),
    type: getType(text),
    message,
  });
}

function parseMessages(messages) {
  const specification = parseSpecifications();
  return messages.map(m => parseMessage(m, specification));
}

module.exports = parseMessages;
