
var speclate = require('../../')

describe('page - loader', () => {
  var out

  describe('Given a simple spec which only defines the page', () => {
    beforeEach((next) => {
      var pageSpec = {
        page: 'home'
      }
      speclate.page.load(pageSpec, (err, data) => {
        if (err) {
          console.log(err)
        }
        out = data
        next()
      })
    })

    it('should render the page in the container', () => {
      expect(out).toContain('<div id="container"><h1>Homepage</h1>\n<div id="bacon">\n</div>\n</div>')
    })
  })

  describe('Given a page spec which defines selectors', () => {
    beforeEach((next) => {
      var pageSpec = {
        page: 'home',
        selectors: {
          h1: 'welcome'
        }
      }
      speclate.page.load(pageSpec, (err, data) => {
        if (err) {
          console.log(err)
        }
        out = data
        next()
      })
    })

    it('should update the h1', () => {
      expect(out).toContain('<h1>welcome</h1>')
    })
  })
  // describe('Given a page spec which defines a title selector', () => {
  //   beforeEach((next) => {
  //     var pageSpec = {
  //       page: 'home',
  //       selectors: {
  //         title: 'welcome'
  //       }
  //     }
  //     speclate.page.load(pageSpec, (err, data) => {
  //       if (err) {
  //         console.log(err)
  //       }
  //       out = data
  //       next()
  //     })
  //   })

  //   it('should update the page title', () => {
  //     if (typeof document !== 'undefined') {
  //       // clientside
  //       expect(document.title).toEqual('welcome')
  //     } else {
  //       // serverside
  //       expect(out).toContain('<title>welcome</title>')
  //     }
  //   })
  // })
})