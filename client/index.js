'use strict';


var loadComponents = require('../lib/load-components');
// var loadLayout = require('../lib/load-components');
//
//var loadLayout = require('../lib/load-components');
//
//
var doSizlate = require('../lib/do-sizlate');


//var getPage = require('../lib/get-page');
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


    // getPage(page, function(error, layout) {
    //
    //     $('#container').html(layout);
    //     console.log('kayout', layout);
    // });



    // load the layout.
    // do layout first.
    // the update components.
    // im going bed.
    //
}
