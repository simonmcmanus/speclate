'use strict'

var fs = require('fs')

exports.write = function (file, contents, callback) {
  fs.writeFile(file, contents, 'utf8', callback)
}

exports.read = function (file, callback) {
  fs.readFile(file, 'utf8', callback)
}
