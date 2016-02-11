Given a spec (a collection of pages) Generate static html pages.




A very simple spec looks like the following:

#Pages

```js
    var spec = {
        '/public/index.html': {
            page: 'home'
        }
    };
    speclate.generate(spec);
```

That will generate an index.html file using the home template.


#Pages with data



#Page with components


#Page with components and data


#Page with components and array of data


#Page with components and array of complex data



For a full example please see:

https://github.com/simonmcmanus/speclate-lnug

https://github.com/simonmcmanus/speclate-lnug/blob/master/index.js

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
