
const Reducer = (datas, options) => {
  this.sources = datas
  this.combined = [].concat.apply(true, datas).slice(1)
  options = options || {}
  options.filters = options.filters || []
  options.maps = options.maps || []
  this.options = options

  if (typeof this.options.sort === 'function') {
    this.combined = this.options.sort(this.options)
  }

  this.get = () => {
    var out = this.combined

    if (options.groupBy) {
      out = out.reduce((acc, cur) => {
        const group = options.groupBy(cur)
        acc[group] = cur
        return acc
      }, {})
    }

    options.filters.forEach((filter) => {
      out = out.filter(filter)
    })
    options.maps.forEach((map) => {
      out = out.map(map)
    })
    return out
  }
  return this
}

module.exports = Reducer
