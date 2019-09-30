const fs = require('fs')
const yamljs = require('yamljs')
const log = require('loglevel')

exports.findAllFiles = (filename, opts) => {
  const findAllUp = require('find-all-up')
  const findAllUpOpts = opts.cwd ? {cwd: opts.cwd} : {}
  const files = findAllUp.sync(filename, findAllUpOpts)
  log.debug(`found files [${files}]`)
  return files.map(f => {
    return {
      file: f,
      content: fs.readFileSync(f).toString()
    }
  }).map(item => {
    const parseFile = (f, content) => {
      const errors = []
      try {
        return require(f)
      } catch (e) {
        errors.push(e)
      }

      try {
        return JSON.parse(content)
      } catch (e) {
        errors.push(e)
      }

      try {
        return yamljs.load(f)
      } catch (e) {
        errors.push(e)
      }
      log.error(`[configush] : file failed to parse [${f}]`, errors)
      throw new Error('[configush] : unable to load')
    }

    item.value = parseFile(item.file, item.content)
    return item
  })
}
