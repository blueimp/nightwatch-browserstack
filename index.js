'use strict'

/*
 * Nightwatch.js module to update BrowserStack session status for failed tests.
 *
 * Copyright 2016, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

module.exports = {
  storeSessionId: function (browser, done) {
    browser.session(function (session) {
      browser.browserStackSessionId = session.sessionId
      done()
    })
  },
  updateStatus: function (browser, done) {
    if (browser.currentTest.results.failed) {
      let caps = browser.globals.test_settings.desiredCapabilities
      let user = caps['browserstack.user']
      let key = caps['browserstack.key']
      let options = {
        host: 'www.browserstack.com',
        path: `/automate/sessions/${browser.browserStackSessionId}.json`,
        method: 'PUT',
        auth: `${user}:${key}`,
        headers: {'Content-Type': 'application/json'}
      }
      require('https')
        .request(options, function () { done() })
        .on('error', function (error) { throw error })
        .end(JSON.stringify({status: 'error'}))
    } else {
      done()
    }
  }
}
