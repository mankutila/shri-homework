const initialState = {
  images: [],
  loading: false,
  page: 1,
  error: null,
  total: 0
  // isOpen: false,
};

export const galleryReducer = function(state = initialState, action) {

  switch (action.type) {
    case 'APPEND_IMAGES':
      return {
        ...state,
        images: state.images === undefined ? action.images : state.images.concat(action.images), //state.images.concat(action.images)
        loading: false,
        page: state.page === undefined ? 1 : action.page
      };
    case 'LOAD_IMAGES':
      return {
        ...state,
        loading: true
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.total
      };
    default:
      return state
  }
};
