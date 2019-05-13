var loader = require('../../../lib/site/loader')

describe('example - non default container ', function () {
  describe('given a simple index.html page', function () {
    var out
    beforeEach(function (next) {
      var spec = {
        options: {
          layout: '/pages/layout-non-default-container.html',
          container: '.page-holder'
        },
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
      expect(out[0].name).toEqual('index.html')
    })

    it('the first item returned should have a markup property should contain the generated page ', function () {
      expect(out[0].markup).toContain('<div class="page-holder"><h1>Homepage</h1>')
    })
  })
})
