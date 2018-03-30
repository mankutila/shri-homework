import React from 'react';
import {Gallery} from "../Gallery/Gallery";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Галерея фото</h1>
        <Gallery />
      </React.Fragment>
    );
  }
}

export default App;