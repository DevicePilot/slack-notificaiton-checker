function asUnixTime(time) {
  if (typeof time === 'number') { return time; }
  if (typeof time === 'string') {
    const unix = Date.parse(time);
    if (Number.isNaN(unix)) {
      console.error(`Unable to parse datetime: ${time}`);
      return 0;
    }
    return unix;
  }
  console.error(`Unable to determine datetime: ${time}`);
  return 0;
}

function compareTime({ time: a }, { time: b }) {
  return asUnixTime(a) - asUnixTime(b);
}
function compareDevice({ device: a }, { device: b }) {
  try {
    return a.toString().localeCompare(b.toString());
  } catch (error) {
    console.error(`Unable to compare device ids: ${a}/${b} as ${error}`);
    return 0;
  }
}
function compareType({ type: a }, { type: b }) {
  try {
    if (a.toString().toLowerCase() === b.toString().toLowerCase) {
      return 0;
    }
    return (a.toString().toLowerCase() === 'flagged') ? 1 : -1;
  } catch (error) {
    console.error(`Unable to compare event types: ${a}/${b} as ${error}`);
    return 0;
  }
}

function compareMessages(a, b) {
  const time = compareTime(a, b);
  if (time !== 0) { return time; }
  const device = compareDevice(a, b);
  if (device !== 0) { return device; }
  return compareType(a, b);
}

function sortMessages(messages) {
  const sorted = messages.slice(0); // take a copy.
  sorted.sort(compareMessages);
  return sorted;
}

module.exports = sortMessages;
