var loader = require('../lib/site/loader')
var expect = require('chai').expect
describe('example - simple ', function () {
  describe('given a simple index.html page', function () {
    var out
    before(function (next) {
      var spec = {
        'index.html': {
          page: 'home'
        }
      }
      loader(spec, function (e, d) {
        out = d
        next()
      })
    })

    it('the first item returned should have a name property of index.html', function () {
      expect(out[0].name).to.equal('index.html')
    })

    it('the first item returned should have a markup property containing the outer layout and the page layout ', function () {
      expect(out[0].markup).to.contain('<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\">\n</div>\n</div>')
    })
  })
})
