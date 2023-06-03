/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require("dayjs");

module.exports = (opts) =>
  require("pino-pretty")({
    ...opts,
    ignore: "pid,hostname",
    customPrettifiers: {
      time: (timestamp) => dayjs(timestamp).format("HH:mm:ssZ[Z]"),
    },
  });
