import test from 'ava'
const Configush = require('../index')
const path = require('path')

test('finds all files - YAML', t => {
  const configuration = Configush.squash({verbose: true, findup: true, filename: 'yaml-config', cwd: path.join(__dirname, '../test-resources/test-project-root/test-project-folder-1')})
  t.is(configuration.default.value, 'some default entry')
  t.is(configuration.echo.description, 'echos stuff')
})

test('finds all files - JSON', t => {
  const configuration = Configush.squash({verbose: true, findup: true, filename: 'json-config', cwd: path.join(__dirname, '../test-resources/test-project-root/test-project-folder-1')})
  t.is(configuration.default, 'some default content')
  t.is(configuration.person.name, 'project-name')
})

test('finds all files - JS', t => {
  const configuration = Configush.squash({verbose: true, findup: true, filename: 'config.js', cwd: path.join(__dirname, '../test-resources/test-project-root/test-project-folder-1')})
  t.is(configuration.default, 'this is a default thing')
  t.is(configuration.person.name, 'javascript name')
})
