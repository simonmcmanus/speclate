'use strict';

window.page = require('page');
window.$ = require('jquery');
var loadComponents = require('../lib/load-components');
var doSizlate = require('../lib/do-sizlate');
var getFile = require('../lib/read-file');


window.setupPage = function(pageName, context, page) {
    var pageLayoutPath =  '/pages/' + pageName + '/' + pageName + '.html';
    var pageJSPath =  '/pages/' + pageName + '/' + pageName + '.js';
    getFile(pageLayoutPath, function(error, file) {
            var html = doSizlate({
                spec: page.spec
            }, file, page);
            $('#container').html(html);
            $('#perPageJs').attr('src', pageJSPath);
    });
}

// old
// window.setupPage = function(pageName, context, page) {
//     $.get(context.path.replace(/.html/, '.json'), {}, function(e, status, data) {
//         var pageLayoutPath =  '//pages/' + pageName + '/' + pageName + '.html';
//         getFile(pageLayoutPath, function(error, file) {
//             loadComponents(data.responseJSON.spec, function(e,d) {
//                 var html = doSizlate({
//                     spec: page.spec
//                 }, file, d);
//                 $('#container').html(html);
//             });
//         });
//     }, 'json');
// }
