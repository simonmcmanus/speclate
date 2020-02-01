var loader = require('../../../lib/site/loader')

describe('given a dynamic route route', () => {
  var lists = {
    filters: {
      onlyPublic: (item) => !item.private
    },
    mappers: {
      links: i => {
        return {
          a: {
            href: i.url
          }
        }
      }
    },
    lists: {
      links: [
        { url: 'http://google.com', tags: ['search'] },
        { url: 'http://twitter.com', tags: ['social'] },
        { url: 'http://yahoo.com', tags: ['search'] }
      ]
    }
  }

  var spec = {
    '/tags/:tags/index.html': {
      page: 'home',
      lists: ['links'],
      spec: {
        '#bacon': {
          component: 'link',
          lists: ['links'],
          filters: ['onlyPublic'],
          mapper: 'links'
        }
      }
    }
  }

  let generatedMarkup

  describe('When the site is rendered', () => {
    beforeAll((done) => {
      loader(spec, lists, (e, pages) => {
        if (e) throw e
        console.log(pages)
        generatedMarkup = pages[0].markup
        done()
      })
    })

    it('should render the first list item', () => {
      expect(generatedMarkup).toContain('<a href="http://google.com" class="linkage"')
    })

    it('should render the second list item', () => {
      expect(generatedMarkup).toContain('<a href="http://twitter.com" class="linkage"')
    })

    it('should not render the filtered list item', () => {
      expect(generatedMarkup).not.toContain('top-secret.com')
    })
  })
})
