import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './component/util/util.css';
import './App.css';

import Header from './component/header/header';
import Foot from './component/foot/foot';
import GalleryContainer from './component/gallery/gallery-container';
import configureStore from './store/configure-store';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Provider store={store}>
          <GalleryContainer/>
        </Provider>
        <Foot />
      </div>
    );
  }
}

export default App;
