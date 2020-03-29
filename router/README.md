# speclate-router


Client side route handling for speclate.

Given a speclate spec (github.com/simonmcmanus/speclate) Generates a page.js router:

# Example

```js
var router = require('speclate-router');
var spec = {
    '/': {
        page: 'home'
    }
};

router(spec, {
  before: function () {
      // before the page change.
  },
  after: function () {
      // after the page change.
    $('html,body').scrollTop($('#container'))
  },
  error: function (err) {
      location.reload()
  }
});

```


# Notes

* / gets replaces for /index.html

For an example see:

https://github.com/lnug/lnug.github.io/blob/master/client/index.js

