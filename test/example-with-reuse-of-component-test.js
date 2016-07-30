var loader = require('../lib/site/loader')
var expect = require('chai').expect

describe('given a simple index.html page', function () {
  var out
  before(function (next) {
    var spec = {
      'index.html': {
        page: 'sponsors',
        spec: {
          '#gold': {
            component: 'sponsor',
            data: [
              {
                span: 'MS',
                img: {
                  src: '/ms'
                }
              },
              {
                span: 'Google',
                img: {
                  src: '/google'
                }
              }
            ]
          },

          '#silver': {
            component: 'sponsor',
            data: [
              {
                span: 'Hive',
                img: {
                  src: '/hive'
                }
              },
              {
                span: 'Tesco',
                img: {
                  src: '/tesco'
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
    expect(out[0].markup).to.contain('<head>\n    <title>page title</title>\n</head>\n<body>\n    <div id=\"container\"><h1>Homepage</h1>\n<div id=\"gold\"><li>\n    <a href=\"\">\n        <span>MS</span>\n        <img src=\"/ms\">\n    </a>\n</li>\n<li>\n    <a href=\"\">\n        <span>Google</span>\n        <img src=\"/google\">\n    </a>\n</li>\n</div>\n<div id=\"silver\"><li>\n    <a href=\"\">\n        <span>Hive</span>\n        <img src=\"/hive\">\n    </a>\n</li>\n<li>\n    <a href=\"\">\n        <span>Tesco</span>\n        <img src=\"/tesco\">\n    </a>\n</li>\n</div>\n</div>\n</body>')
  })
})
