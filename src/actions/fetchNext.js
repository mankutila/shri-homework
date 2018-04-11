export function fetchNext() {
  return function (dispatch, getState) {
    dispatch({
      type: 'FEED_LOADING'
    });

    try {

      let page = getState().page;

      // let response = await fetch(`https://pixabay.com/api/?key=8532246-55268eb0f8f42379b33ae8c5d&q=architecture&image_type=photo&editors_choice=true&safesearch=true&per_page=50&page=${page}`, {credentials: 'same-origin'});

      // let data = await response.json();

      console.log(`card loading page ${page}`)

      /*dispatch({
        type: 'FEED_APPEND_CARDS',
        images: data.hits,
        page: getState().page + 1
      });*/
    } catch (error) {
      dispatch({
        type: 'FEED_ERROR',
        error
      });
    } finally {
      dispatch({
        type: 'FEED_LOADING'
      });
    }
  };
}