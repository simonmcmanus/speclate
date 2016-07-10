
exports.site = {
  markup: require('./lib/site/generate-markup'),
  api: require('./lib/site/generate-api'),
  appCache: require('./lib/site/app-cache'),
  doSizlate: require('./lib/page/do-sizlate')
}

exports.page = {
  load: require('./lib/page/loader')
}

exports.components = {
  load: require('./lib/page/load-components')
}

