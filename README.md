Given a spec (a collection of pages)


Generate static html pages.

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
