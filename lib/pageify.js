var pageify = require('pageify/index');
var fs = require('fs');


//var file = fs.readFileSync(__dirname + '/client-setup.js', 'utf8');
module.exports = function(spec, callback) {
    var toSend = {
        setupPage: false,
        PAGES_FOLDER: '/public/pages/',
       PUBLIC_FOLDER: '/pages/',
       PUBLIC_PAGES_FOLDER: '/pages/',
       JS_EXT: '.js',
       CSS_EXT: '.scss',
       require: false,
       scriptLoader: '$script',
       mappings: spec
   };



    var router = pageify(toSend, function(error, router) {
        console.log('writing router', './public/router.js');
        fs.writeFile('./public/router.js', router, callback);
    });
};
