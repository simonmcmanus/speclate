'use strict'

var speclateFetch = require('speclate-fetch')

// override readfile with request to fetch.
exports.readFile = speclateFetch.readFile
