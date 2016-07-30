var loader = require('../lib/site/loader')
var expect = require('chai').expect

describe('example / complex data', function () {
  describe('given a simple index.html page', function () {
    var out
    before(function (next) {
      var spec = {
        'index.html': {
          page: 'home',
          spec: {
            '#bacon': {
              component: 'cat',
              data: [
                {
                  img: {
                    src: 'IMGPATH'
                  }
                },
                {
                  img: {
                    src: 'IMGPATH2'
                  }
                }
              ]
            }
          }
        }
      }
      loader(spec, function (e, d) {
        out = d
        next()
      })
    })

    it('should add the component to the appropriate place in the DOM', function () {
      expect(out[0].markup).to.contain('<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img src=\"IMGPATH\">\n<li>\n    Hello i am a cat.\n</li>\n<img src=\"IMGPATH2\">\n</div>\n</div>')
    })
  })
})
