import React, { Component } from 'react';
import Header from './core/header';
import ChatsComponent from './chats/chats';
import AuthLogin from './auth/login';

export default class RootComponent extends Component {
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <AuthLogin />
        <ChatsComponent />
      </div>
    )
  }
}