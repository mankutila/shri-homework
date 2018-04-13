import { combineReducers } from 'redux';

import { imagesReducer } from './imagesReducer';
import { lightboxReducer } from './lightboxReducer';
import tagsReducer from './tagsReducer';


export const mainReducer = combineReducers({
  images: imagesReducer,
  lightbox: lightboxReducer,
  tags: tagsReducer
});
