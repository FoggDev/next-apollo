// Configuration
import common from './common.json'
import local from './local.json'
import production from './production.json'
import test from './test.json'

// Config container
let config

// Configurations by environment
const configurations = {
  local: {
    baseUrl: local.baseUrl,
    cache: local.cache,
    debug: local.debug,
    general: common.general,
    languages: common.languages,
    security: common.security,
    serverPort: common.serverPort,
    session: local.session
  },
  production: {
    baseUrl: production.baseUrl,
    cache: production.cache,
    debug: production.debug,
    general: common.general,
    languages: common.languages,
    security: common.security,
    serverPort: common.serverPort,
    session: production.session
  },
  test: {
    baseUrl: test.baseUrl,
    cache: test.cache,
    debug: test.debug,
    general: common.general,
    languages: common.languages,
    security: common.security,
    serverPort: common.serverPort
  }
}

// development => local
let env = 'local'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  env = process.env.NODE_ENV
}

// Environments
export const $isLocal = () => env === 'local'
export const $isProduction = () => env === 'production'
export const $isTest = () => env === 'test'

// Configurations
export const $config = () => !config ? configurations[env] : config
export const $baseUrl = () => $config().baseUrl
export const $cache = () => $config().cache
export const $debug = () => $config().debug
export const $general = () => $config().general
export const $languages = () => $config().languages
export const $security = () => $config().security
export const $serverPort = () => $config().serverPort
export const $session = () => $config().session
