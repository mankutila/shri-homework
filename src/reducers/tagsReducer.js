const initialState = {
  current: 'architecture'
};

export default function (state = initialState, action) {

  if (action.type === 'SET_TAG') {
    return {
      ...state,
      current: action.tag
    };
  }

  return state;
}
