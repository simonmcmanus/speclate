// var loader = require('../../lib/site/loader')

// describe('example / selectors', function () {
//   describe('given a simple index.html page', function () {
//     var out
//     beforeEach(function (next) {
//       var spec = {
//         '/': {
//           page: 'home',
//           spec: {
//             '#bacon': {
//               component: 'cat'
//             }
//           }
//         }
//       }
//       loader(spec, function (e, d) {
//         out = d
//         next()
//       })
//     })

//     it('the first item returned should have a name property of index.html', function () {
//       expect(out[0].name).toEqual('/')
//     })

//     it('the first item returned should have a markup property containing the outer layout and the page layout ', function () {
//       expect(out[0].markup).toContain('<div id=\"container\"><h1>Homepage</h1>\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img>\n</div>\n</div>')
//     })
//   })
// })
