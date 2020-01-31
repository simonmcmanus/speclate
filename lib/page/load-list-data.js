/**
 * Given an item with a list/filter/mapper, and a complete lists object return the data for the item.
 */

module.exports = (item, lists, params) => {
  /**
   * first pass seems to do the mapping and pass it back in mapped.
   */
  if (item.lists) {
    // combine the lists
    item.lists.forEach((listName) => {
      if (!item.data) {
        item.data = []
      }
      if (lists.lists[listName]) {
        item.data = item.data.concat(lists.lists[listName])
      }
    })

    if (item.filters) {
      item.filters.forEach((filter) => {
        if (!lists.filters[filter]) {
          throw new Error('Filter specified does not exist (' + filter + ') ')
        }
        item.data = item.data.filter(lists.filters[filter], { params: params })
      })
    }

    if (item.mapper && item.data) {
      if (!lists.mappers[item.mapper]) {
        throw new Error('Mapper defined but not available (' + item.mapper + '), has it been loaded?')
      }
      item.data = item.data.map(lists.mappers[item.mapper])
    }
    delete item.lists
  }

  return item
}
