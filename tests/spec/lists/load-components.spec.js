var loadComponents = require('../../../lib/page/load-components')

describe('when render components is called', () => {
  var page = {
    page: 'links',
    params: {
      id: 123,
      tag: 'bacon'
    },
    spec: {
      '.links_holder': {
        component: 'link',
        lists: ['ids'],
        filters: ['tagged'],
        mapper: 'idLink'
      }
    }
  }
  var lists = {
    mappers: {
      idLink: function (item) {
        return { a: item.id }
      }
    },
    filters: {
      tagged: function (item) {
        if (!item.tags || !this.params || !this.params.tag) {
          return false
        }
        return item.tags.includes(this.params.tag)
      },
      validId: function (item) {
        return item.id === this.params.id
      }
    },
    lists: {
      ids: [
        { id: 123, tags: ['bacon', 'cheese'] },
        { id: 321, tags: ['bacon', 'tomato'] },
        { id: false }
      ]
    }
  }

  let renderedComponents
  beforeEach(next => {
    loadComponents(page, lists, (err, data) => {
      if (err) throw err
      renderedComponents = data
      next()
    })
  })

  // it('should fetch the correct compoent')
  // it('should update the compoent with the selectors provided')
  // it('should return mutliple items, where list items are provided')
  // it('should apply the fitlers')
  // it('should apply the ')

  it('should render two components with different html values', () => {
    expect(renderedComponents.link['.links_holder']).toContain(
      '<a href="" class="linkage">123</a>'
    )
    expect(renderedComponents.link['.links_holder']).toContain(
      '<a href="" class="linkage">321</a>'
    )
  })

  // it('should render t', () => {
  //   expect(renderedComponents.link['.links_holder']).toEqual({})
  // })
})
