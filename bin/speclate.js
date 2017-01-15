#!/usr/bin/env node
var path = require('path')
var pkg = require(path.join(__dirname, '/../package.json'))
var spec = require(process.cwd() + '/spec.js')

var speclateCli = require('speclate-cli');

speclateCli(spec, pkg.version, function (err) {
  if (err) {
    console.log('got an error', err)
    process.exit(1)
  } else {
    process.exit(0)
  }
});
