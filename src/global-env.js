import { getGlobalEnv } from '@twreporter/core/lib/utils/global-env'

const globalEnv = getGlobalEnv()

globalEnv.pkgVersion = process.env.PKG_VERSION
globalEnv.isBrowser = typeof window !== 'undefined'
globalEnv.isDevelopment = globalEnv.nodeEnv !== 'production'
globalEnv.isProduction = globalEnv.nodeEnv === 'production'

export default globalEnv
