var expect = require('chai').expect;


var loadLayout = require('../lib/load-layout');

describe('Given a layout ', () => {
    var layout = 'animals';
    var markup = '';
    beforeEach((next) => {
        loadLayout(layout, (err, data) => {
            markup = data;
            next();
        });
    })
    it('should do stuff', () => {
        expect(markup).to.equal('');
    })

});
