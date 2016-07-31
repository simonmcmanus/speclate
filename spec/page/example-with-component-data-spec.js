var loader = require('../../lib/site/loader')

describe('example / component - data /', function () {
  describe('given a simple index.html page', function () {
    var spec
    var out
    beforeEach(function (next) {
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
      loader(spec, function (e, d) {
        out = d
        next()
      })
    })

    it('should add the component to the appropriate place in the DOM', function () {
      // client side does not always have the same line breaks so we strip em to be sure.
      var lineFreeMarkup = out[0].markup.replace(/[\r\n]/g, '')
      var lineFreeExpected = '<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img src=\"IMGPATH\">\n</div>\n</div>'.replace(/[\r\n]/g, '')

      expect(lineFreeMarkup).toContain(lineFreeExpected)
    })
  })
})
