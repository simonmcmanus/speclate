var loader = require('../lib/site/loader')
var expect = require('chai').expect

describe('example / component - data /', function () {
  describe('given a simple index.html page', function () {
    var spec
    var out
    before(function (next) {
      spec = {
        'index.html': {
          page: 'home',
          spec: {
            '#bacon': {
              component: 'cat',
              data: [{
                img: {
                  src: 'IMGPATH'
                }
              }]
            }
          }
        }
      }
      loader(spec, (e, d) => {
        out = d
        next()
      })
    })

    it('should add the component to the appropriate place in the DOM', function () {
      expect(out[0].markup).to.contain('<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img src=\"IMGPATH\">\n</div>\n</div>')
    })
  })
})
