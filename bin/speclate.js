#!/usr/bin/env node
var path = require('path')
var pkg = require(path.join(__dirname, '/../package.json'))
var spec = require(process.cwd() + '/spec.js')
var speclate = require('../')

require('speclate-cli')(spec, speclate, pkg.version)
