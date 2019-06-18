var loader = require('../../../lib/site/loader')

describe('nested component selector ', function () {
  describe('given a   page', function () {
    var out
    beforeEach(function (next) {
      var spec = {
        options: {
          layout: '/pages/layout-non-default-container.html',
          container: '.page-holder'
        },
        'index.html': {
          page: 'home',
          spec: {
            '#bacon': {
              component: 'cat',
              data: {
                'li': {
                  className: 'bacon'
                },
                'img': {
                  className: 'cat'
                }

              }
            }
          }
        }
      }
      loader(spec, function (e, d) {
        out = d
        next()
      })
    })

    it('the first items markup should contain the rendered component', function () {
      expect(out[0].markup.replace(/\n/g, '')).toContain('<div id="bacon"><li class="bacon">    Hello i am a cat.</li><img class="cat"></div>')
    })
  })
})
