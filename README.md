[![Build Status](https://travis-ci.org/simonmcmanus/speclate.svg?branch=master)](https://travis-ci.org/simonmcmanus/speclate)
[![Dependency Status](https://dependencyci.com/github/simonmcmanus/speclate/badge)](https://dependencyci.com/github/simonmcmanus/speclate)

#Speclate

Define websites using a javascript spec. Render each page at build time, in the browser and offline.

Ensure the best possible rendering experience is available to the widest possible audience.


Allows the latest web technologies to be used as layered enhancements so you can give the best expereince to the widest possible audience.



#Conventions - (Folder Structure)


Layout, page, component files should only contain valid HTML.

Speclate relies on some convensions, these will eventually be configurable.

All paths are relative to the spec.js file.

##Layout

All sites need an outer page layout:

```js
/pages/layout.html
```

This should include anything you want to share accross all pages. CSS, JS, nav, header, footer. Anything that doesn't change. You can still use selectors to update the layout between pages. eg adding an active class.

/pages/layout.html needs to contain a html element with an id of container:

```html
<div id="container">
</div>
```

This is used to append the page content to.


##Pages

If you want to use a 'contact' page in a spec you need to create the page at:

```js
/pages/contact/contact.html
```

A page can be used by multiple routes, using the spec and selectors to change its appearance.

##Components

If you want to call a component 'contact' you need to create a html file at:

```js
/component/contact/contact.html
```

Components allow small chunks of html to be reused within pages (iterating over a list) and also allow pieces of HTML to be re-used between pages.




#Specs


##Page with selectors


```js
    var spec = {
        '/': {
            page: 'home',
            selectors: {
                h1: 'welcome',
                title: 'hellow'
            }
        }
    };
```

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



#Page with components and array of data

```js
    var spec = {
        '/': {
            page: 'home',
            spec: {
                component: 'cat'
                data: [{
                    li: 'hello kitty'
                },
                {
                    li: 'item two'
                }
                ]
            }
        }
    };
```


#Page with components and array of complex data



##Example:

```bash
npm install speclate
git clone git@github.com:simonmcmanus/speclate-example.git
cd speclate-example
npm run build
```

###What just happened?

The NPM run build command does a couple of things, firstly it generates our client side router, and service worker file, then it runs speclate --all which does the following:

1. Generate a completely static version of all pages defined in the spec. Speclate puts it in /docs if your don't specify a different folder.
2. Generetate a JSON file for each page on the site: /docs/api/speclate, this contains just the data that changes between pages.
3. Move the layouts pages and components into the appropriate place so that the pages can be rendered from the browser (/docs)

Now you have a functioning site that will serve static html on first page load, it will reuse that layout on subsequnet page changes and its all available offline.

Speclate uses spes to define how the pieces of a websit should fit together. It relies on some convensions:


#CLI

speclate --all

Will generate a site given a spec.json in the current directory.

--all runs the following commands which you can run on their own

* validate - validate the schema
* markup - generate the site markup
* specs - generate the json spec files for each page
* files - move files listed in spec.options.files into spec.options.outputDir


#Examples

https://github.com/simonmcmanus/speclate-example
https://github.com/lnug/lnug.github.io


#Clientside Routing:
Take the /pages/home/home.html and append it to the #container div in the layout.html.

Get the cat component and append it to the li, changing the innerHTML to helllo kitty.




#Local Development

For testing purposes you can run a local server by running the command:

```bash
speclate --debug
```

That will start a server running at https://localhost:5002



#About


Speclate was originally built to support the LNUG website.

Speclate uses sizzle selectors with sizlate.


#Examples

For a full example please see:

https://github.com/lnug/lnug.github.io
