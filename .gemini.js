module.exports = {
  rootUrl: 'http://localhost:3000',
  compositeImage: true,
  browsers: {
    chrome: {
      windowSize : "1920x1080",
      desiredCapabilities: {
        browserName: 'chrome',
      }
    },
    'mobile-chrome': {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          mobileEmulation: {
            deviceMetrics: {
              width: 411,
              height: 731
            },
            userAgent: 'Mozilla/5.0 (Linux; Android 6.0; vivo 1713 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36'
          }
        }
      }
    }
  },
  sets: {
    desktop: {
      files: 'src/gemini/',
      browsers: ['chrome']
    },
    mobile: {
      files: 'src/gemini/',
      browsers: ['mobile-chrome']
    }
  }
};