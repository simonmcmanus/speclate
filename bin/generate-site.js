#!/usr/bin/env node

var speclate = require('../index')

var spec = require(process.cwd() + '/spec')

speclate.site.markup(spec, function (error) {
  if (error) {
    console.log('Error generating site: ', error)
  }
})
