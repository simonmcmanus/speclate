[![Build Status](https://travis-ci.org/simonmcmanus/speclate.svg?branch=master)](https://travis-ci.org/simonmcmanus/speclate)
[![Dependency Status](https://dependencyci.com/github/simonmcmanus/speclate/badge)](https://dependencyci.com/github/simonmcmanus/speclate)

#Speclate

[![Greenkeeper badge](https://badges.greenkeeper.io/simonmcmanus/speclate.svg)](https://greenkeeper.io/)

Define websites using a spec.js file. Render each page at build time, in the browser and offline.

Ensure the best rendering experience is always available to the widest possible audience.


---

* [Convensions](#conversations)
* [Specs](#specs)
* [Examples](#example)
* [CLI](#cli)
* [Try it out](#try-it)
* [About](#about)


---

### Conventions

Layout, page and component files only contain valid HTML.

All paths are relative to the spec.js file.

### Layout

All sites need an outer page layout:

```js
/pages/layout.html
```

This should include anything you want to share accross all pages. css, js, nav, header, footer. Anything that doesn't change. You can still use the spec to update the layout between pages. eg adding an active class.

The **layout** needs to contain a html element with an id of container:

```html
<div id="container">
</div>
```

This is used to append the page content to.

[Example Layout](https://github.com/simonmcmanus/speclate-example/blob/master/pages/layout.html)

### Pages

If you want to use a `contact` page in a spec you need to create the page at:

```js
/pages/contact/contact.html
```

A **page** can be used by multiple routes, using the page specs to change the appearance.

[Example Contact Page](https://github.com/simonmcmanus/speclate-example/blob/master/pages/contact/contact.html)

### Components

If you want to call a component `contact` you need to create a html file at:

```js
/component/contact/contact.html
```

Components allow small chunks of html to be reused between pages and when looping through a list.



## Specs


### Simple page spec

A very simple spec looks like this:

```js
module.exports = {
    '/': {
        page: 'home'
    }
};
```

Take the home page (**/pages/home/home.html**) and append it to #container domNode in the layout.html.

[View the test](https://github.com/simonmcmanus/speclate/blob/master/spec/examples/simple-page-spec.js)


### Page with simple selectors

```js
module.exports = {
    '/': {
        page: 'home',
        spec: {
            h1: 'welcome',
            title: 'hello'
        }
    }
};
```

Take **/pages/home/home.html** and add it to the layout #container.
Replace any h1 innerHTML text and set the title to hellow.

[View the test](https://github.com/simonmcmanus/speclate/blob/master/spec/examples/selectors-spec.js)

### Page as a function

```js
module.exports = {
    '/': {
        page: function(callback) {
            callback('<div> Some info about us </div>');
        }
    }
};
```

Provide a function that when called generates the markup required for the page.

[View the test](https://github.com/simonmcmanus/speclate/blob/master/spec/examples/page-as-function-spec.js)


### Page with simple component

```js
module.exports = {
    '/': {
        page: 'home',
        spec: {
            '#bacon': {
                component: 'cat'
            }
        }
    }
};
```

Take the **/pages/home/home.html** and append it to the #container div in the layout.html.

[View the test](https://github.com/simonmcmanus/speclate/blob/master/spec/examples/simple-component-spec.js)


### Page with component and array of data

```js
module.exports = {
    '/': {
        page: 'pets',
        spec: {
            '#pets': {
                component: 'cat'
                data: [
                    {
                        li: 'Bob'
                    },
                    {
                        li: 'Jane'
                    }
                ]
            }
        }
    }
};
```


Take the **/pages/pets/pets.html** and append it to the #container div in the layout.html.

Get the cat component and append it to the pets li, changing the innerHTML to **Bob** and **Jane**.

## Try it:


### Install


```bash
git clone git@github.com:simonmcmanus/speclate-example.git
cd speclate-example
npm install
```

### Build


```bash
npm run build
speclate --debug
```

### What just happened?

The NPM run build command does a couple of things, firstly it generates our client side router and service worker file, then it runs **speclate --all** which does the following:

1. Generate a completely static version of all pages defined in the spec. These will be used for the inital page load and will be served to crawlers or anyone who doesn't have javascript enabled.
2. Generetate a JSON file for each page on the site: **/docs/api/speclate**, this contains just the data that changes between pages and will be used to check the server for changes.
3. Move the layouts pages and components defined in the spec into the appropriate place so that the pages can be rendered in the browser.

The speclate **speclate --debug** command creates a server so you can test your site [locally](https://127.0.0.1:5002).

## CLI

```bash
speclate --build
```

Will generate a site given a spec.json in the current directory.

to get a full list of commands type:

```bash
speclate --help
```

## Examples

* https://github.com/simonmcmanus/speclate-example
* https://github.com/lnug/lnug.github.io


## Clientside Router:

* https://github.com/simonmcmanus/speclate-router


## Local Development

For testing purposes you can run a local server by running the command:

```bash
speclate --debug
```

That will start a server running at https://localhost:5002

You will need to run the **speclate --all** command separately to build the files.

## Contributing

Please see the [contributing guide](https://github.com/simonmcmanus/speclate/blob/master/CONTRIBUTE.md)

## About

Speclate was originally built to support [the LNUG website](https://lnug.org).

Speclate uses [Sizzle](https://sizzlejs.com/) selectors with [Sizlate](github.com/simonmcmanus/sizlate).


