import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import { Provider } from 'react-redux';
import configureStore from './store/store-config';
import { loadMessages } from './actions/messages-actions';
import Style from './style.scss';

import RootComponent from './components/root';
import Auth from './components/auth/auth';
import Chats from './components/chats/chats';
import HomePage from './components/home';


const store = configureStore();
// store.dispatch(loadMessages());
const browserHistory = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <RootComponent />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));