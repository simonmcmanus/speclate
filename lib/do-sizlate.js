var sizlate = require('sizlate');

module.exports = function (page, layout, components) {
    var selectors = {};

    // this is where it all goes wrong.
    for(var component in page.spec) {
        selectors[component] = components[page.spec[component].component];
    }
    return sizlate.render(layout, selectors);
}
