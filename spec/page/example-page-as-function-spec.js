var loader = require('../../lib/site/loader')

describe('example - simple ', function () {
  describe('given a simple index.html page', function () {
    var out
    beforeEach(function (next) {
      var spec = {
        'index.html': {
          page: function (callback) {
            callback(null, '<h1>GENERATEPAGE</h1>')
          }
        }
      }
      loader(spec, function (e, d) {
        out = d
        next()
      })
    })

    it('the first item returned should have a name property of index.html', function () {
      expect(out[0].name).toEqual('index.html')
    })

    it('the first item returned should have a markup property should contain the generated page ', function () {
      expect(out[0].markup).toContain('<div id=\"container\"><h1>GENERATEPAGE</h1></div>')
    })
  })
})
