'use strict'

var fs = require('fs')

module.exports = function (file, contents, callback) {
  fs.writeFile(file, contents, 'utf8', callback)
}
