var sizlate = require('sizlate');

module.exports = function (page, layout, renderedComponents) {
    var selectors = {};
    var spec = page.spec;

    // this is where it all goes wrong.
    for(var component in spec) {
        // console.log('-->', component, spec[component].component);
        // console.log('-->', renderedComponents[spec[component].component][component]);
        selectors[component] = renderedComponents[spec[component].component][component];
    }
    return sizlate.render(layout, selectors);
}
