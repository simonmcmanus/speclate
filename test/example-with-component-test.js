var loader = require('../lib/loader')
var expect = require('chai').expect

describe('example/component', () => {
  describe('given a simple index.html page', () => {
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

    it('should add the component to the appropriate place in the DOM', () => {
      expect(out[0].markup).to.equal('<html>\n<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img>\n</div>\n</div>\n</html>\n')
    })
  })
})
