var sizlate = require('sizlate');

module.exports = function(page, layout, components) {
    var selectors = {};
    for(var component in page.spec) {

        selectors[component] = components[page.spec[component].component];
    }

    console.log('dsselectors', selectors);
    return sizlate.render(layout, selectors);
}
