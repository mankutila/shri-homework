const initialState = {
  images: [],
  loading: false,
  page: 1,
  error: null,
  total: 0,
  isOpen: false,
  photoIndex: 0,
  allLoaded: false
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
    case 'OPEN_LIGHTBOX':
      return {
        ...state,
        isOpen: true,
        photoIndex: action.photoIndex
      };
    case 'CLOSE_LIGHTBOX':
      return {
        ...state,
        isOpen: false
      };
    case 'TOGGLE_IMAGE':
      return {
        ...state,
        photoIndex: action.photoIndex
      };
    case 'NEXT_PHOTO':
      return {
        ...state,
        photoIndex: action.photoIndex
      };
    case 'ALL_LOADED':
      return {
        ...state,
        allLoaded: true
      };
    default:
      return state
  }
};
