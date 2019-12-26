/**
 *  This file is used by `webpackConfig.resolve.alias`,
 *  and it is existed due to the following reason.
 *  On server side,
 *  we use `winston` and `@google-cloud/logging-winston` to log;
 *  however, they are not fully supporting browser.
 *  Instead, we use `console` directly to log on client side (browser),
 *  Therefore, Webpack should not bundle `winston` and `@google-cloud/logging-winston`.
 *
 *  We use `webpackConfig.resolve.alias` to tell Webpack to import this no operation file
 *  rather than importing `winston` and `@google-cloud/logging-winston`
 */
export default {}
