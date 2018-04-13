const initialState = {
  images: [],
  loading: false,
  page: 1,
  error: null,
  total: 0,
  allLoaded: false
};

export const imagesReducer = function(state = initialState, action) {

  if (action.type === 'APPEND_IMAGES') {
    return {
      ...state,
      images: state.images.concat(action.images),
      loading: false,
      page: action.page
    };
  }

  if (action.type === 'LOAD_IMAGES') {
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === 'LOAD_ERROR') {
    return {
      ...state,
      error: action.error,
      loading: false
    };
  }

  if (action.type === 'SET_TOTAL') {
    return {
      ...state,
      total: action.total
    };
  }

  if (action.type === 'ALL_LOADED') {
    return {
      ...state,
      allLoaded: true
    };
  }

  return state;

};
