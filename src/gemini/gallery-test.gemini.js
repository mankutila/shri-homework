gemini.suite('Gallery', (suite) => {
  suite
    .setUrl('/')
    .before(function( actions, find ){
      actions.wait(5000);
    })
    .setCaptureElements('.gallery')
    .capture('plain');
});

