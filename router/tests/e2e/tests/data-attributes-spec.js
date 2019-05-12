module.exports = {

  'data attributes should be set on the html node': function (browser) {
    browser
      .url('http://localhost:5004/contact.html')
      .assert.containsText('html[data-speclate-url="/contact.html"][data-speclate-page="contact"]', 'contact')

      .end()
  }

}
