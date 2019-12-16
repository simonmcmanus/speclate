
var pageLoader = require('../../../lib/page/loader')

describe('page - loader', function () {
  var out

  var speclateOptions = {
    container: '#container',
    layout: '/pages/layout.html'
  }

  describe('Given a simple spec which only defines the page', function () {
    beforeEach(function (next) {
      var pageSpec = {
        page: 'home'
      }
      var lists = {}
      pageLoader(pageSpec, speclateOptions, lists, function (err, data) {
        if (err) {
          console.log('ERR:', err)
        }
        out = data
        next()
      })
    })

    it('should render the page in the container', function () {
      expect(out).toContain('<div id="container"><h1>Homepage</h1>\n<div id="bacon">\n</div>\n</div>')
    })
  })

  describe('Given a page spec which defines selectors', function () {
    beforeEach(function (next) {
      var pageSpec = {
        page: 'home',
        spec: {
          h1: 'welcome'
        }
      }
      var lists = {}
      pageLoader(pageSpec, speclateOptions, lists, function (err, data) {
        if (err) {
          console.log(err)
        }
        out = data
        next()
      })
    })

    it('should update the h1', function () {
      expect(out).toContain('<h1>welcome</h1>')
    })
  })

  //   describe('Given a page spec which defines a title selector', function () {
  //     beforeEach(function (next) {
  //       var pageSpec = {
  //         page: 'home',
  //         selectors: {
  //           title: 'welcome'
  //         }
  //       }
  //       speclate.page.load(pageSpec, (err, data) => {
  //         if (err) {
  //           console.log(err)
  //         }
  //         out = data
  //         next()
  //       })
  //     })

//     it('should update the page title', function () {
//       if (typeof document !== 'undefined') {
//         // clientside
//         console.log(document.title, window.document.title);
//         expect(document.title).toEqual('welcome')
//       } else {
//         // serverside
//         expect(out).toContain('<title>welcome</title>')
//       }
//     })
// })
})
