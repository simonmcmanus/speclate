var expect = require('chai').expect;
var loadLayout = require('../lib/load-layout');

describe('When load layout is called requesting the animals layout ', () => {
    var layout = 'animals';
    var markup = '';
    beforeEach((next) => {
        loadLayout(layout, (err, data) => {
            markup = data;
            next();
        });
    });
    it('should load the animals template into the main layout into the container div', () => {
        expect(markup).to.equal("<html>\n<body>\n    <div id=\"container\"><ul id=\"animals\">\n</ul>\n</div>\n</body>\n</html>\n");
    });
});
