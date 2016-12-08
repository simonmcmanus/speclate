#!/usr/bin/env node
var path = require('path')
var pkg = require(path.join(__dirname, '/../package.json'))
var spec = require(process.cwd() + '/spec.js')

require('speclate-cli')(spec, pkg.version)
