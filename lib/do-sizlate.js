var sizlate = require('sizlate');

module.exports = function (page, layout, components) {
    var selectors = {};

    for(var component in page.spec) {
        selectors[component] = components[page.spec[component].component];
    }
    return sizlate.render(layout, selectors);
}
