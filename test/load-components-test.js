var expect = require('chai').expect;
var loadComponents = require('../lib/load-components');

describe('When load components is called requesting the animals layout ', () => {
    var out;
    beforeEach((next) => {

        var components = {
            'ul': {
                component: 'cat',
                data: {
                    li: 'hello my name is dr greenthumb'
                }
            }
        };
        loadComponents(components, (err, data) => {
            out = data;
            next();
        });
    });

    it('should pass the callback an object', () => {
        console.log('out', out)
        expect(out).to.be.an('object');
    });
    it('should load the cat componentand update using the selectors specified', () => {
        expect(out.cat).to.equal('<li>hello my name is dr greenthumb</li>\n');
    });
});


describe('When load components is called requesting with an array the animals layout ', () => {
    var out;
    beforeEach((next) => {

        var components = {
            'ul': {
                component: 'cat',
                data: [
                    {
                        li: 'Simon'
                    },
                    {
                        li: 'Bob'
                    }
                ]
            }
        };
        loadComponents(components, (err, data) => {
            out = data;
            next();
        });
    });

    it('should pass the callback an object', () => {
        expect(out).to.be.an('object');
    });
    it('should load the cat component twice with the names added', () => {
        expect(out.cat).to.equal('<li>Simon</li>\n<li>Bob</li>\n');
    });
});


describe('given the lnug sponsors example', () => {

})
