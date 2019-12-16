
// extracts a list of all the files needed to render the page.
// this will be used to build the page but also to load them into the client.
module.exports = function (page) {
  // does this need to look at the detualt spec?
  const out = {
    pages: [page.page],
    components: [],
    lists: page.lists || [],
    filters: page.filters || [],
    mappers: page.mapper ? [page.mapper] : []
  }

  for (var selector in page.spec) {
    if (page.spec[selector].component) {
      out.components.push(page.spec[selector].component)
      if (page.spec[selector].lists) {
        out.lists = out.lists.concat(page.spec[selector].lists)
      }
      if (page.spec[selector].filters) {
        out.filters = out.filters.concat(page.spec[selector].filters)
      }
      if (page.spec[selector].mapper) {
        out.mappers = out.mappers.concat(page.spec[selector].mapper)
      }
      var states = page.spec[selector].states
      for (var state in states) {
        out.components.push(states[state].component)
        if (states[state].mapper) {
          out.mappers.push(states[state].mapper)
        }
      }
    }
  }
  var deduped = {}
  for (var item in out) {
    deduped[item] = [...new Set(out[item])]
  }
  return deduped
}
