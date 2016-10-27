import test from 'ava'
var execSync = require('child_process').execSync

test('read configuration', t => {
  var result = execSync('node ./test-resources/app-example.js --config test-resources/app-config.json')
  t.true(result.indexOf('hello:') > 0)
})
