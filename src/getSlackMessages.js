const fs = require('fs');
const { devicePilotUser } = require('../config');

function readJson(path) {
  const file = fs.readFileSync(path);
  return JSON.parse(file);
}

function getSlackMessages(path) {
  const messages = readJson(path);
  const fromDevicePilot = messages.filter(({ username }) => username === devicePilotUser);
  return fromDevicePilot;
}

module.exports = getSlackMessages;
