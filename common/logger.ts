import { SPLAT } from "triple-beam";
import { createLogger, format, transports } from "winston";

const { printf } = format;

const customFormat = printf(log => {
  const { level, message, label, timestamp, ms } = log;
  const splat = JSON.stringify(log[SPLAT]) || "";
  return `${timestamp} [${label}] [${process.env._X_AMZN_TRACE_ID}] [${ms}] ${level}: ${message} ${splat}`;
});

export const logger = createLogger({
  format: format.combine(
    format.label({ label: "house-service" }),
    format.timestamp(),
    format.ms(),
    customFormat
  ),
  level: process.env.logLevel ? process.env.logLevel : "warn",
  transports: [new transports.Console()]
});
