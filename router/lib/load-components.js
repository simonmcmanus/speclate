// 'use strict'
// var forEachOf = require('async.eachof')
// var loadComponent = require('../../lib/load-component')

// module.exports = function (page, lists) {
//   var out = {}
//   if (!page.spec) {
//     return out
//   }

//   forEachOf(page.spec, function (item, selector, next) {
//     if (typeof item.component === 'undefined') {
//       return next()
//     } else if (!out[item.component]) {
//       out[item.component] = {}
//     }
//     loadComponent(item.component, function (err, template) {
//       if (err) {
//         return next(err)
//       }
//       out[item.component] = template
//       next()
//     })
//   }, (err) => {
//     callback(err, out)
//   })
// }
