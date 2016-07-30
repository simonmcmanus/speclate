var loader = require('../lib/site/loader')
var expect = require('chai').expect

describe('example / selectors', function () {
  describe('given a simple index.html page', function () {
    var out
    before((next) => {
      var spec = {
        'index.html': {
          page: 'home',
          spec: {
            '#bacon': {
              component: 'cat'
            }
          }
        }
      }
      loader(spec, (e, d) => {
        out = d
        next()
      })
    })

    it('the first item returned should have a name property of index.html', function () {
      expect(out[0].name).to.equal('index.html')
    })

    it('the first item returned should have a markup property containing the outer layout and the page layout ', function () {
      expect(out[0].markup).to.contain('<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img>\n</div>\n</div>')
    })
  })
})
