#!/usr/bin/env node
var package = require(__dirname + '/../package.json');
var spec = require(process.cwd() + '/spec.js');

require('speclate-cli')(spec, package.version);