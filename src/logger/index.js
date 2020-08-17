import globalEnv from '../global-env'
import {
  createDevLogger,
  createProdLogger,
  makeExpressMiddleware,
} from './winston-logger'

function loggerFactory() {
  let logger

  function create() {
    let logger

    if (globalEnv.isBrowser) {
      // on client side,
      // we use console directly
      // TODO:
      // send client side log to stackdriver logging
      logger = console

      // since we use the same logger both on client and server side,
      // we mock `errorReport` function here.
      logger.errorReport = console.error
      return logger
    }

    // on server side,
    // we use winston and logging-winston to log
    if (globalEnv.isProduction) {
      logger = createProdLogger()
    } else {
      logger = createDevLogger()
    }

    // Integration with Stackdriver error reporting
    // @param {Object} args
    // @param {string} args.message - error message
    // @param {*} args.report - anything you want to record in stackdriver logging
    // @return {undefined}
    logger.errorReport = ({ message, report }) => {
      if (report instanceof Error) {
        if (message) {
          report.message = message + ' ' + report.message
        }
        logger.error(report)
        return
      }
      const err = new Error(message)
      // `err.__errorReport` would be logged as `jsonPayload.metadata.__errorReport` in stackdriver logging
      err.__errorReport = report
      logger.error(err)
    }

    return logger
  }

  const factory = {
    getLogger: () => {
      if (!logger) {
        logger = create()
      }
      return logger
    },
  }

  factory.makeExpressMiddleware = () => {
    const logger = factory.getLogger()
    if (globalEnv.isProduction) {
      return makeExpressMiddleware(logger)
    }

    return Promise.resolve((req, res, next) => {
      logger.info(req.url)
      next()
    })
  }

  return factory
}

export default loggerFactory()
