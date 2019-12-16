module.exports = {
  '/index.html': {
    page: 'home'
  },
  '/contact.html': {
    page: 'contact'
  },
  '/slides/bacon.html': {
    page: 'slides/bacon'
  },
  options: {
    outputDir: '/docs',
    files: ['./client/router-compiled.js']
  }
}
