var loader = require('../../../lib/site/loader')

describe('given a generated route', () => {
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
        { url: 'http://google.com' },
        { url: 'http://twitter.com' },
        { url: 'http://top-secret.com', private: true } ]
    }
  }

  var spec = {
    '/tags/json/index.html': {
      page: 'home',
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

  beforeEach(async (done) => {
    loader(spec, lists, (e, pages) => {
      if (e) throw e
      generatedMarkup = pages[0].markup
      done()
    })
  })

  describe('When the page is rendered', () => {
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
