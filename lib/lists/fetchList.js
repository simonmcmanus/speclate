var fetchJson = require('speclate-fetch').json

module.exports = function (listName, callback) {
  var url = `/lists/${listName}.json`
  fetchJson(url, callback)
}
