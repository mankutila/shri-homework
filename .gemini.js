module.exports = {
  rootUrl: 'http://localhost:3000',
  compositeImage: true,
  browsers: {
    chrome: {
      windowSize : "1920x1080",
      desiredCapabilities: {
        browserName: 'chrome',
      }
    }
  },
  sets: {
    desktop: {
      files: ['src/gemini/gallery-test.gemini.js', 'src/gemini/lightbox-test.gemini.js'],
      browsers: ['chrome']
    }
  }
};