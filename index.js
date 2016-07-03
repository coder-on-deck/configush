/**
 * support the following
 *  - --config flag in command line
 *  - CONFIG_FILE environment variable
 */
var path = require('path')
var argv = require('minimist')(process.argv.slice(2))
var log = require('loglevel')
var fs = require('fs')

exports.init = function (/* opts */) {
  log.setLevel(argv.verbose ? 'debug' : 'error')

  var configFile = null

  if (argv.config) {
    configFile = argv.config
  }

  if (process.env.CONFIG_FILE) {
    configFile = process.env.CONFIG_FILE
  }

  if (configFile) {
    configFile = path.resolve(configFile)
    if (!fs.existsSync(configFile)) {
      log.warn('[simple-config] : file ' + configFile + ' does not exist')
    }
    log.debug('[simple-config] : using debug file ' + configFile)
  } else {
    log.debug('[simple-config] : no config file specified')
  }

  exports.configFile = configFile
  return exports
}
