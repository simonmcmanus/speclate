
var specFromRoute = require('./spec-from-route')

describe('SpecFromRoute', function () {
  describe('Given /', () => {
    var pathName = '/'
    var expectedOut = '/index.json'
    var specPath = specFromRoute(pathName)

    it('should result in ' + expectedOut, function () {
      expect(specPath).toEqual(expectedOut)
    })
  })

  describe('Given /', () => {
    var pathName = ''
    var expectedOut = '/index.json'
    var specPath = specFromRoute(pathName)

    it('should result in ' + expectedOut, function () {
      expect(specPath).toEqual(expectedOut)
    })
  })

  describe('Given a full  url string', () => {
    var pathName = '/bacon.html'
    var expectedOut = '/bacon.json'
    var specPath = specFromRoute(pathName)

    it('should result in ' + expectedOut, function () {
      expect(specPath).toEqual(expectedOut)
    })
  })

  describe('Given a a url ending with a forward slash (folder containing index.html)', () => {
    var pathName = '/bacon/'
    var expectedOut = '/bacon/index.json'
    var specPath = specFromRoute(pathName)

    it('should result in ' + expectedOut, function () {
      expect(specPath).toEqual(expectedOut)
    })
  })
})
