const initialState = {
  isOpen: false,
  photoIndex: 0,
  error: false
};

export default function(state = initialState, action) {

  if (action.type === 'OPEN_LIGHTBOX') {
    return {
      ...state,
      isOpen: true,
      photoIndex: action.photoIndex,
      error: false
    };
  }

  if (action.type === 'CLOSE_LIGHTBOX') {
    return {
      ...state,
      isOpen: false,
      error: false
    };
  }

  if (action.type === 'TOGGLE_IMAGE') {
    return {
      ...state,
      photoIndex: action.photoIndex,
      error: false
    };
  }

  if (action.type === 'IMAGE_ERROR') {
    return {
      ...state,
      error: true
    };
  }

  return state;

};
