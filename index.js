/* eslint no-console: "off" */
const getSlackMessages = require('./src/getSlackMessages');

const logFile = './logs/2017-10-11.json';
const messages = getSlackMessages(logFile);
console.log(`Log contains ${messages.length} DevicePilot notifications`);
