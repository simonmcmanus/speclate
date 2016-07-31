[![Build Status](https://travis-ci.org/simonmcmanus/speclate.svg?branch=master)](https://travis-ci.org/simonmcmanus/speclate)
[![Dependency Status](https://dependencyci.com/github/simonmcmanus/speclate/badge)](https://dependencyci.com/github/simonmcmanus/speclate)


#Speclate

Define your website using a javascript spec, render it anywhere.

Portable specs that can render at build time, on the server or in the browser.

This was originally built to support the LNUG website.


##Specs



#Simple Page

A very simple spec looks like the following:

```js
    var spec = {
        '/': {
            page: 'home'¡
        }
    };
```

Take the home page (/pages/home/home.html) and append it to the #container domNode in the layout.html.

Save the resulting file as index.html.


#Page with selectors

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

Take /pages/home/home.html and add it to the layout #container.
Replace any h1 with innerHTML welcome and set the title to hellow.

Save the resulting file as index.html.



#Page as a function

```js
    var spec = {
        '/': {
            page: function(callback) {
                callback('<div> here is your page </div>');
            }
        }
    };
```

Provide a function that when called generates the markup required for the page.


#Page with simple component


```js
    var spec = {
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

Take the /pages/home/home.html and append it to the #container div in the layout.html.

Get the cat component and append it to the li, changing the innerHTML to helllo kitty.


#Page with component and array of data

```js
    var spec = {
        '/': {
            page: 'home',
            spec: {
                '#pets': {
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
        }
    };
```

#API

##Site

###speclate.site.markup(spec, callback)

Given a spec (a collection of pages) Generate static html pages.


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
