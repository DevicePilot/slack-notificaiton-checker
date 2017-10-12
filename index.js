/* eslint no-console: "off" */
const getSlackMessages = require('./src/getSlackMessages');
const parseMessages = require('./src/parseMessages');
const getDuplicates = require('./src/getDuplicates');
const getOoos = require('./src/getOoos');

const logFile = process.argv[2];
const messages = getSlackMessages(logFile);
console.info(`${logFile} contains ${messages.length} DevicePilot notifications`);

const parsed = parseMessages(messages);

const duplicates = getDuplicates(parsed);
if (duplicates.length) {
  console.warn(`${duplicates.length} duplicates found:`);
  console.warn(JSON.stringify(duplicates));
} else {
  console.info('No duplicates found');
}

const ooos = getOoos(parsed);
if (ooos.length) {
  console.warn(`${ooos.length} out of order actions found:`);
  console.warn(JSON.stringify(ooos));
} else {
  console.info('No out of order actions found');
}
