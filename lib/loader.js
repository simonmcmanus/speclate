var getPage = require('./get-page');
var writeFile = require('./write-file');

module.exports = function (spec, callback) {
    Object.keys(spec).forEach(function (page) {
        console.log('====>', spec[page]);
        getPage(spec[page], function (err, pageMarkup) {
            console.log('-->', err);
            callback(page, pageMarkup);
        });
    });
};
