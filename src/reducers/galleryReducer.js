const initialState = {
  images: [],
  loading: false,
  page: 1,
  error: null
  // isOpen: false,
};

export const galleryReducer = function(state = initialState, action) {

  switch (action.type) {
    case 'APPEND_IMAGES':
      console.log(state.images);
      return {
        ...state,
        images: state.images === undefined ? action.images : state.images.concat(action.images), //state.images.concat(action.images)
        loading: false
      };
    case 'LOAD_IMAGES':
      return {
        ...state,
        loading: true
      };
    case 'FEED_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
};
