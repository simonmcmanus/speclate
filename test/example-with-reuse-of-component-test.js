var loader = require('../lib/loader');
var expect = require('chai').expect;

describe('given a simple index.html page', () => {
    var spec;
    var out;
    before((next) => {
        var spec = {
            'index.html': {
                page: 'sponsors',
                spec: {
                    '#gold': {
                        component: 'sponsor',
                        data: [
                            {
                                span: 'MS'
                            },
                            {
                                span: 'Google'

                            }
                        ]
                    },

                    '#silver': {
                        component: 'sponsor',
                        data:
                        [
                            {
                                span: 'Hive'

                            },
                            {
                                span: 'Tesco'

                            }
                        ]
                    }
                }
            }
        };
        loader(spec, (e, d) => {
            console.log(d)
            out = d;
            next();
        });
    })

    it('should add the component to the appropriate place in the DOM', () => {
        expect(out[0].markup).to.equal('<html>\n<div id=\"container\"><h1>Homepage</h1>\n<div id=\"gold\"><li>\n    <a href=\"\">\n        <span>MS</span>\n        <img src=\"\">\n    </a>\n</li>\n<li>\n    <a href=\"\">\n        <span>Google</span>\n        <img src=\"\">\n    </a>\n</li>\n</div>\n<div id=\"silver\"><li>\n    <a href=\"\">\n        <span>Hive</span>\n        <img src=\"\">\n    </a>\n</li>\n<li>\n    <a href=\"\">\n        <span>Tesco</span>\n        <img src=\"\">\n    </a>\n</li>\n</div>\n</div>\n</html>\n');
    })
});
