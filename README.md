Given a spec (a collection of pages) Generate static html pages.




A very simple spec looks like the following:

#Pages

```js
    var spec = {
        'index.html': {
            page: 'home'
        }
    };
```

Take the home page (/pages/home/home.html) and append it to the #container domNode in the layout.html.

Save the resulting file as index.html.


#Pages with selectors


```js
    var spec = {
        'index.html': {
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
        'index.html': {
            page: function(params, callback) {
                callback('<div> here is your page </div>');
            }
        }
    };
```

Provide a function that when called generates the markup required for the page.


#Page with components


```js
    var spec = {
        'index.html': {
            page: 'home',
            spec: {
                component: 'cat'
                data: {
                    li: 'hello kitty'
                }
            }
        }
    };
```

Take the /pages/home/home.html and append it to the #container div in the layout.html.

Get the cat component and append it to the li, changing the innerHTML to helllo kitty.

#Page with components and data



#Page with components and array of data


#Page with components and array of complex data



For a full example please see:

https://github.com/simonmcmanus/speclate-lnug

https://github.com/simonmcmanus/speclate-lnug/blob/master/index.js




```js
    {
        'PAGEURL': {
            page: 'home',
            spec: {
                '.lnug-ticket': {
                    component: 'ticket',
                    data: {
                        '.lnug-nextmeetup': '12th October 2014',
                        '.venue': 'Royal Albert Hall'
                    }
                },
                '.lnug-content': {
                    component: 'speaker',
                    data: require('./data/speaker-selectors')
                },
                '.lnug-mailing-list': {
                    component: 'sign-up'
                }
            }
        }
    }
```

```js
    {
        '/public/index.html': {
            page: 'home',
            spec: {
                '.lnug-ticket': {
                    component: 'ticket',
                    data: {
                        '.lnug-nextmeetup': '12th October 2014',
                        '.venue': 'Royal Albert Hall'
                    }
                },
                '.lnug-content': {
                    component: 'speaker',
                    data: require('./data/speaker-selectors')
                },
                '.lnug-mailing-list': {
                    component: 'sign-up'
                }
            }
        },

        '/public/archive.html': {
            page: 'archive',
            spec: {
                'ul.archive': {
                    component: 'archive',
                    data: require('./data/archive-selectors')()
                }
            }
        },
        '/public/code-of-conduct.html': {
            page: 'code-of-conduct'
        }
    }
```


# Generate

# Load