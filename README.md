# Nightwatch.js BrowserStack status update
Update [BrowserStack](https://www.browserstack.com) session status based on
[Nightwatch.js](http://nightwatchjs.org/) test results.

## Install

```sh
npm install nightwatch-browserstack
```

## Usage

```js
module.exports = {
  beforeEach: function (browser, done) {
    if (this.test_settings.selenium_host === 'hub.browserstack.com') {
      return require('nightwatch-browserstack').storeSessionId(browser, done)
    }
    done()
  },
  afterEach: function (browser, done) {
    if (this.test_settings.selenium_host === 'hub.browserstack.com') {
      return require('nightwatch-browserstack').updateStatus(browser, done)
    }
    done()
  }
}
```

## License
Released under the [MIT license](https://opensource.org/licenses/MIT).

## Author
[Sebastian Tschan](https://blueimp.net/)
