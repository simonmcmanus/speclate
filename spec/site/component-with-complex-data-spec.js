var loader = require('../../lib/site/loader')

describe('example / complex data', function () {
  describe('given a simple index.html page', function () {
    var out
    beforeEach(function (next) {
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
        // stripping the line breaks should not be necessary here.
      var lineFreeMarkup = out[0].markup.replace(/[\r\n]/g, '')
      var lineFreeExpected = '<div id="container"><h1>Homepage</h1>\n<div id="bacon"><li>\n    Hello i am a cat.\n</li>\n<img src="IMGPATH">\n<li>\n    Hello i am a cat.\n</li>\n<img src="IMGPATH2"></div>\n</div>'.replace(/[\r\n]/g, '')
      expect(lineFreeMarkup).toContain(lineFreeExpected)
    })
  })
})
