import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Gallery } from "../Gallery/Gallery";
import './App.css';

import { createStore, compose, applyMiddleware } from 'redux';
import { mainReducer } from "../../reducers/mainReducer";

function middleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(middleware)
  )
);

class App extends Component {
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
