import globalEnv from '../global-env'
import { createDevLogger, createProdLogger, makeExpressMiddleware } from './winston-logger'

function loggerFactory() {
  let logger

  function create() {
    // on server side,
    // we use winston and logging-winston to log
    if (!globalEnv.isBrowser) {

      if (globalEnv.isProduction) {
        return createProdLogger()
      }
      return createDevLogger()
    }

    // on client side,
    // we use console directly
    // TODO:
    // send client side log to stackdriver logging
    return console
  }

  const factory = {
    getLogger: () => {
      if (!logger) {
        logger = create()
      }
      return logger
    }
  }

  factory.makeExpressMiddleware = () => {
    const logger = factory.getLogger()
    return makeExpressMiddleware(logger)
  }

  return factory
}

export default loggerFactory()
