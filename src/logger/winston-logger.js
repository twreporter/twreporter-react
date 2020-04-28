import globalEnv from '../global-env'
import releaseBranchConst from '@twreporter/core/lib/constants/release-branch'
import util from 'util'
import winston from 'winston'
import { LoggingWinston, express } from '@google-cloud/logging-winston'

/**
 *  @param {string} releaseBranch - 'master', 'preview', 'staging' or 'release'
 *  @return {string} kubernetes namespace
 */
function getK8sNamespaceName(releaseBranch) {
  switch(releaseBranch) {
    case releaseBranchConst.release:
      return 'production'
    case releaseBranchConst.preview:
      return 'default'
    default:
      return releaseBranch
  }
}

/**
 *  @return {Object} Winston logger instance
 */
export function createProdLogger() {
  const containerName = 'twreporter-website-v2'
  const namespaceName = getK8sNamespaceName(globalEnv.releaseBranch)
  const opts = {
    serviceContext: {
      version: globalEnv.pkgVersion
    }
  }

  if (globalEnv.releaseBranch === releaseBranchConst.preview) {
    const clusterName = 'keystone'

    // for stackdriver error reporting
    opts.serviceContext.service = `${clusterName}:${containerName}:${namespaceName}:server`

    // Since preview release branch is
    // deployed to different kubernetes cluster, which is keystone-cluster,
    // and keystone-cluster doesn't support (new) stackdriver logging;
    // hence, we use legacy stackdriver logging on preview release branch.
    // That means we use default `opts.resource` here.

  } else {
    const clusterName = 'twreporter'

    // for stackdriver error reporting
    opts.serviceContext.service = `${clusterName}:${containerName}:${namespaceName}:server`

    // For (new) stackdriver logging.
    // If we don't specify resource object,
    // default `resource.type` would be 'container';
    // hence, logs will only be viewed in legacy stackdriver logging.
    // See more: https://cloud.google.com/monitoring/kubernetes-engine/migration?hl=zh-tw#resource_type_changes
    opts.resource = {
      type: 'k8s_container',
      labels: {
        cluster_name: clusterName,
        namespace_name: namespaceName,
        container_name: containerName
      }
    }
  }
  const loggingWinston = new LoggingWinston(opts)

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

  const printFormat = winston.format.printf(({ level, message, timestamp: ts, stack, __errorReport }) => {
    if (stack) {
      message += (message ? ' ' : '') + stack
    }
    let ep = ''
    if (__errorReport) {
      ep = `\n Error report: ${util.inspect(__errorReport)}`
    }
    return `${ts} ${level}: ${message} ${ep}`
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
