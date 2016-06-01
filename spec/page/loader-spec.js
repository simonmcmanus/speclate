if(typeof require != 'undefined') {
    var speclate = require('../../');
}


var sinon = require('sinon');


describe(' ', () => {

    var markup;
    var pageSpec = {
        page: 'home',
        spec: {
            '.className': {
                component: 'sponsor',
                data: {}
            }
        }
    };
    beforeEach(() => {
        speclate.page.load(pageSpec, (err, data) => {
            markup = data;
        });
    });
    it('should load the animals template into the main layout into the container div', () => {
        expect(markup).toEqual("<html>\n<body>\n    <div id=\"container\"><ul id=\"animals\">\n</ul>\n</div>\n</body>\n</html>\n");
    });
});


// var expect = require('chai').expect;
// var getPage = require('../lib/get-page');
//
// describe('given a page', function() {
//     var pageSpec;
//     beforeEach(() => {
//         pageSpec = {
//             page: 'home',
//             spec: {
//                 '.className': {
//                     component: 'sponsor',
//                     data: {}
//                 }
//             }
//         };
//     });
//
//     getPage();
//
//     it('shoud', () => {
//         expect(1).to.equal(1)
//     })
//
// });
