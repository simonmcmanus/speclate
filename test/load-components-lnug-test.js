// var expect = require('chai').expect;
// var sponsors = require('./mocks/lnug-sponsors');
// var loadComponents = require('../lib/load-components');
//
// describe('When load components is called requesting the animals layout ', () => {
//     var out;
//     beforeEach((next) => {
//         loadComponents(sponsors, (err, data) => {
//             console.log('out', err, data);
//             out = data;
//             next();
//         });
//     });
//
//     it('load the components', () => {
//         expect(out.sponsor).to.equal('<li>microsoft</li><li>google</li>\n');
//     });
// });