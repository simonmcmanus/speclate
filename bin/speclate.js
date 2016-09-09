#!/usr/bin/env node

var spec = require(process.cwd() + '/spec.js');

require('speclate-cli')(spec);