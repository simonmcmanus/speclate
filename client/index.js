'use strict';


var loadComponents = require('../lib/load-components');
var doSizlate = require('../lib/do-sizlate');
var getFile = require('../lib/read-file');

window.setupPage = function(pageName, context, page) {
    $.get(context.path.replace(/.html/, '.json'), {}, function(e, status, data) {
        var pageLayoutPath =  '/public//pages/' + pageName + '/' + pageName + '.html';
        getFile(pageLayoutPath, function(error, file) {
            console.log('spec is', data.responseJSON.spec);
            loadComponents(data.responseJSON.spec, function(e,d) {
                var html = doSizlate({
                    spec: page.spec
                }, file, d);
                $('#container').html(html);
            });
        });
    }, 'json');
}
