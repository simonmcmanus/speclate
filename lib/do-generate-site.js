var speclate = require('speclate')
var spec = require('../spec')

speclate.generate(spec, function (error) {
  if (error) {
    console.log('Error generating site: ', error)
  }
})
