# slack-notificaiton-checker
Parse an exported channel log from Slack to verify that there are no duplicates, or out of sequence events.

### Usage
1. Install dependencies: `npm install`
2. Export [data and message history](https://get.slack.help/hc/en-us/articles/201658943-Export-data-and-message-history)
2. Run with `node index.js ./path/to/channel-date-log-file.json`

For further configuration options (including regex's used to parse messages) and documentation see *config.js*.
