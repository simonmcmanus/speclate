module.exports = {
  'Page should be added to the container': function (browser) {
    browser
      .url('http://localhost:5004/index.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#container', 'home')
      .url('http://localhost:5004/contact.html')
      .assert.containsText('#container', 'contact')
      .end()
  },

  'full page loads with just /': function (browser) {
    browser
      .url('http://localhost:5004/')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#container', 'home')
      .url('http://localhost:5004/contact.html')
      .assert.containsText('#container', 'contact')
      .url('http://localhost:5004/')
      .waitForElementVisible('body', 1000)
      .end()
  },

  'full page loads with just no forward slash': function (browser) {
    browser
      .url('http://localhost:5004')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#container', 'home')
      .url('http://localhost:5004/contact.html')
      .assert.containsText('#container', 'contact')
      .url('http://localhost:5004')
      .waitForElementVisible('body', 1000)
      .end()
  },

  'works with directory in the url': function (browser) {
    browser
      .url('http://localhost:5004/slides/bacon.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#container', 'bacon is great')
      .url('http://localhost:5004')
      .waitForElementVisible('body', 1000)
      .end()
  }
}
