import winston from 'winston'
import { LoggingWinston, express } from '@google-cloud/logging-winston'

/**
 *  @return {Object} Winston logger instance
 */
export function createProdLogger() {
  const loggingWinston = new LoggingWinston({
    // for stackdriver error reporting
    serviceContext: {
      service: 'twreporter-react-server',
      version: '1',
    },
  })

  return winston.createLogger({
    level: 'info',
    transports: [
      loggingWinston
    ]
  })
}

/**
 *  @return {Object} Winston logger instance
 */
export function createDevLogger() {
  const enumerateErrorFormat = winston.format(info => {
    if (info instanceof Error) {
      return Object.assign({
        message: info.message,
        stack: info.stack
      }, info);
    }

    return info;
  });

  const printFormat = winston.format.printf(({ level, message, timestamp: ts, stack }) => {
    if (stack) {
      message += (message ? ' ' : '') + stack
    }
    return `${ts} ${level}: ${message}`
  })

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      enumerateErrorFormat(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.colorize(),
      printFormat
    ),
    transports: [
      new winston.transports.Console()
    ],
  });
}

/**
 *  @param {Object} logger - Winston logger instance
 *  @return {Promise} - resolve with Express middleware function
 */
export function makeExpressMiddleware(logger) {
  return express.makeMiddleware(logger)
}
