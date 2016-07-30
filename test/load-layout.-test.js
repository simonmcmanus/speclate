var expect = require('chai').expect;
var loadLayout = require('../lib/page/load-layout');


describe('When load layout is called requesting the animals layout ', function () {
    var layout = 'animals'
    var markup = ''
    beforeEach(function (next) {
        loadLayout(layout, function (err, data) {
            markup = data
            next()
        })
    })
    it('should load the animals template into the main layout into the container div', function () {
        expect(markup).to.equal("<html>\n<head>\n    <title>page title</title>\n</head>\n<body>\n    <div id=\"container\"><ul id=\"animals\">\n</ul>\n</div>\n</body>\n</html>\n")
    })
})
