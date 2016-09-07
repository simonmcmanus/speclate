'use strict'

// prepare a file path for use in speclate

var path = require('path')

module.exports = function (url) {
  var folder
  if (process.env.NODE_ENV === 'test') {
    folder = path.join(process.cwd(), '/spec/sample')
  } else {
    folder = process.cwd()
  }
  if (folder === '/') {
    folder = ''
  }
  return path.join(folder, url)
}
