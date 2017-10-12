/* eslint no-console: "off" */
const getSlackMessages = require('./src/getSlackMessages');
const parseMessages = require('./src/parseMessages');
const getDuplicates = require('./src/getDuplicates');

const logFile = './logs/2017-10-11.json';
const messages = getSlackMessages(logFile);
console.info(`Log contains ${messages.length} DevicePilot notifications`);

const parsed = parseMessages(messages);

const duplicates = getDuplicates(parsed);
if (duplicates.length) {
  console.warn(`${duplicates.length} duplicates found:`);
  console.warn(JSON.stringify(duplicates));
} else {
  console.info('No duplicates found');
}

