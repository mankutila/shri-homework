import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {galleryReducer} from '../../reducers/galleryReducer';
import {Gallery} from "../Gallery/Gallery";
import './App.css';

function middleware({dispatch, getState}) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  galleryReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(middleware)
  )
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <h1>Галерея фото</h1>
          <Gallery />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;