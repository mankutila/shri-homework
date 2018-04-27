gemini.suite('Gallery', (suite) => {
  suite
    .setUrl('/')
    .before(function( actions, find ){
      actions.wait(5000);
    })
    .setCaptureElements('.gallery')
    .capture('plain');
});

gemini.suite('Lightbox', (suite) => {
  suite
    .setUrl('/')
    .before(function( actions, find ){
      actions.wait(5000);
      const button = find('.gallery__item');
      actions.mouseDown(button).mouseUp(button);
    })
    .setCaptureElements('.lightbox')
    .capture('plain');
});
