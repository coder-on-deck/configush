/**
 * support the following
 *  - --config flag in command line
 *  - CONFIG_FILE environment variable
 */
var path = require('path')
var argv = require('minimist')(process.argv.slice(2))
var log = require('loglevel')
var fs = require('fs')
const findConfFiles = require('./find_conf_files')

/**
 * @typedef {Options}
 * @property {string} filename
 * @property {string} cwd - working directory to look from (if relative path)
 * @property {boolean} findup - whether to find all files and return a list
 **/

class Configuration {
  /**
   * @description - populates `configFile` property with either a list of files (findup) or a single stirng.
   * @parameter {Options} opts
   * @return {object} this with "configFile" property
   **/
  init (opts = {}) {
    log.setLevel((argv.verbose || opts.verbose) ? 'debug' : 'error')
    log.debug(`[configush] : opts [${opts}]`)
    let configFile = null

    if (process.env.CONFIG_FILE) {
      configFile = process.env.CONFIG_FILE
    }

    if (argv.config) {
      configFile = argv.config
    }

    if (opts.filename) {
      configFile = opts.filename
    }

    log.debug(`[configush] : filename [${configFile}]`)

    if (opts.findup) {
      log.debug('finding up')
      this.configFile = findConfFiles.findAllFiles(configFile, opts)
      if (this.configFile.length === 0) {
        console.warn(`[configush] : file [${configFile}] was not found-up`)
      }
      return this
    } else if (configFile) {
      configFile = path.join(opts.cwd || process.cwd(), configFile)
      if (!fs.existsSync(configFile)) {
        log.warn('[configush] : file ' + configFile + ' does not exist')
      }
      log.debug('[configush] : using debug file ' + configFile)
    } else {
      log.debug('[configush] : no config file specified')
    }

    this.configFile = configFile
    return this
  }
}

Configuration.get = function (opts) {
  return require(new Configuration().init(opts).configFile)
}

Configuration.multi = function (filename) {
  return new Configuration().init({filename, findup: true})
}

Configuration.squash = function (opts) {
  const configuration = new Configuration().init(opts)
  return configuration.configFile.map(i => i.value).reverse().reduce((result, item) => {
    return Object.assign({}, result, item)
  }, {})
}

module.exports = Configuration
