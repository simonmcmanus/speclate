var loader = require('../lib/loader');
var expect = require('chai').expect;

describe('example / complex data', () => {

    describe('given a simple index.html page', () => {
        var spec;
        var out;
        before((next) => {
            var spec = {
                'index.html': {
                    page: 'home',
                    spec: {
                        '#bacon': {
                            component: 'cat',
                            data: [
                            {
                                img: {
                                    src: 'IMGPATH'
                                }
                            },
                            {
                                img: {
                                    src: 'IMGPATH2'
                                }
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
            expect(out[0].markup).to.equal('<html>\n<div id=\"container\"><h1>Homepage</h1>\n\n<div id=\"bacon\"><li>\n    Hello i am a cat.\n</li>\n<img src=\"IMGPATH\">\n<li>\n    Hello i am a cat.\n</li>\n<img src=\"IMGPATH2\">\n</div></div>\n</html>\n');
        })
    });

});
