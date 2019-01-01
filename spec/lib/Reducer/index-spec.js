
const Reducer = require('../../../lib/Reducer')

describe('Reducer', function () {
  const edam = { source: 'Netherlands' }
  const wensleydale = { source: 'Yorkshire' }

  const cheeses = [edam, wensleydale]

  describe('Given a simple reducer', function () {
    const reducer = Reducer(cheeses)

    describe('Calling `Get`', () => {
      const reducedData = reducer.get()

      it('should return the data', function () {
        expect(reducedData).toEqual(cheeses)
      })
    })
  })

  describe('Given a simple reducer with a map function', function () {

    const options = {
      maps: [function(item) { return { '.origin': item.source }}]
    }
    const reducer = Reducer(cheeses, options)

    describe('Calling `Get`', () => {
      const reducedData = reducer.get()

      it('should return the data with the map applied', function () {
        expect(reducedData[0]).toEqual({'.origin': 'Netherlands' })
      })
    })
  })

  describe('Given a reducer with a groupBy method', function () {

    const options = {
      groupBy: (item) => {
        return item && item.source
      }
    }
    const reducer = Reducer(cheeses, options)

    describe('Calling `Get`', () => {
      const reducedData = reducer.get()

      it('should return the data', function () {
        expect(reducedData).toEqual(cheeses)
      })
    })
  })

  describe('Given a reducer with a groupBy method', () => {
    it('should ')
  })
})
