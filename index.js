
exports.site = {
  markup: require('./lib/site/generate-markup'),
  api: require('./lib/site/generate-api'),
  appCache: require('./lib/site/app-cache'),
}

exports.page = {
  load: require('./lib/page/loader'),
  doSizlate: require('./lib/page/do-sizlate')
}

exports.components = {
  load: require('./lib/page/load-components')
}

