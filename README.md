[![Build Status](https://travis-ci.org/simonmcmanus/speclate.svg?branch=master)](https://travis-ci.org/simonmcmanus/speclate)
[![Dependency Status](https://dependencyci.com/github/simonmcmanus/speclate/badge)](https://dependencyci.com/github/simonmcmanus/speclate)


#Speclate

Define sites and pages using a javascript spec.

Portable specs that can render at build time, on the server and/or in the browser.


##Folder Structure

You need a a outer page layout:

/pages/layout.html

The html file for the home page sit at:

/pages/home/home.html

and components use the same structure:

/components/contact/contact.html

##Specs

###Site Spec

```js
var siteSpec = {
    '/': homePageSpec,
    '/contact': contactPageSpec,
    '/about': aboutPageSpec,
};
```

###Simple page spec

A very simple page spec looks like this:

```js
var homePageSpec = {
    page: 'home'
};
```

Take the home page (/pages/home/home.html) and append it to #container domNode in the layout.html.


#Page spec with selectors

```js
var contactPageSpec = {
    page: 'contact',
    selectors: {
        h1: 'Contact us',
        title: 'Contact us'
    }
};
```

Take /pages/contact/contact.html and add it to the layout #container.
Replace any h1 innerHTML text and set the title to hellow.


#Page as a function

```js
var aboutPageSpec = {
    page: function(callback) {
        callback('<div> Some info about us </div>');
    }
};
```

Provide a function that when called generates the markup required for the page.

#Page with simple component

```js
var pageSpec = {
    page: 'home',
    spec: {
        '#bacon': {
            component: 'cat'
        }
    }
};
```

Take the /pages/home/home.html and append it to the #container div in the layout.html.

#Page with component and array of data

```js
var petsPageSpec = {
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
};
```

Get the cat component and append it to the li for each item in the data array.


#API

##Site

###speclate.site.markup(siteSpec, callback)

Given a site spec, Generate static html pages.


```js
var speclate = require('speclate');
var spec = {
    '/': {
        page: 'home'
    }
};
speclate.site.markup(spec, function(errors) {
    if(!error) {
        console.log('done generating site');
    }
});
```

#Clientside Routing:

see:
https://github.com/simonmcmanus/speclate-router


#Examples

For a full example please see:

https://github.com/lnug/lnug.github.io


#About


Speclate uses sizzle selectors with sizlate.
