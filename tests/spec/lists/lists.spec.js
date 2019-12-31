var loader = require('../../../lib/site/loader')

describe('given a generated route', () => {
  // var html = `
  // <html><body>
  // <h1>hello</h1>
  // <ul id="list-holder"/>

  // </body></html>`

  var spec = {
    '/': {
      page: 'links',
      spec: {
        'ul#list-holder': {
          component: 'link',
          lists: ['links']
        }
      }
    }
  }

  describe('When the page is rendered', () => {
    let out
    var lists = {}
    beforeEach((next) => {
      loader(spec, lists, function (noterror, site) {
        out = site
        next()
      })
    })

    it('should render the list', () => {
      console.log(out)
    })
  })
})
