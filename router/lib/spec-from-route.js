module.exports = function (pathname) {
  var routeName

  if (pathname.slice(-5) === '.html') { // url ends with .html
    routeName = pathname.slice(0, -5)
    if (routeName === '') {
      routeName = '/index'
    }
  } else if (pathname.slice(-1) === '/') {
    routeName = pathname + 'index'
  } else if (pathname === '') {
    routeName = '/index'
  }
  return routeName + '.json'
}
