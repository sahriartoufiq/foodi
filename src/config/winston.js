"use strict";

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, errors, simple } = format;
const timestampFormat = { format: "YYYY-MM-DD HH:mm:ss" };

const debugLogger = createLogger({
  level: "debug",
  defaultMeta: { service: "buying_frenzy" },
  transports: [
    new transports.Console({
      level: "debug",
      format: combine(
        colorize(),
        timestamp(timestampFormat),
        errors({ stack: true }),
        simple()
      ),
    }),
  ],
});

const errorLogger = createLogger({
  level: "error",
  defaultMeta: { service: "buying_frenzy" },
  transports: [
    new transports.Console({
      level: "error",
      format: combine(
        colorize(),
        timestamp(timestampFormat),
        errors({ stack: true }),
        simple()
      ),
    }),
  ],
});

module.exports = {
  debugLogger,
  errorLogger,
};
