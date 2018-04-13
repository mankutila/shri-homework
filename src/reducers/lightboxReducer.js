const initialState = {
  isOpen: false,
  photoIndex: 0
};

export const lightboxReducer = function(state = initialState, action) {

  if (action.type === 'OPEN_LIGHTBOX') {
    return {
      ...state,
      isOpen: true,
      photoIndex: action.photoIndex
    };
  }

  if (action.type === 'CLOSE_LIGHTBOX') {
    return {
      ...state,
      isOpen: false
    };
  }

  if (action.type === 'TOGGLE_IMAGE') {
    return {
      ...state,
      photoIndex: action.photoIndex
    };
  }

  return state;

};
