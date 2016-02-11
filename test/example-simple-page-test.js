var loader = require('../lib/loader');
var expect = require('chai').expect;

describe('given a simple index.html page', () => {
    var spec;
    var out;
    before((next) => {
        var spec = {
            'index.html': {
                page: 'home'
            }
        };
        loader(spec, (e, d) => {
            out = d;
            next();
        });
    })

    it('the first item returned should have a name property of index.html', () => {
        expect(out[0].name).to.equal('index.html');
    })

    it('the first item returned should have a markup property containing the outer layout and the page layout ', () => {
        expect(out[0].markup).to.equal('<html>\n<body>\n    <div id=\"container\"><h1>Homepage</h1>\n    <div>\n    </div>\n</div>\n</body>\n</html>\n');
    })
});
