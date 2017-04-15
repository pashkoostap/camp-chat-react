import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Style from './style.scss';
import RootComponent from './components/root';
import configureStore from './store/store-config';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RootComponent />
  </Provider>, document.getElementById('root'));