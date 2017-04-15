import React, { Component } from 'react';
import Header from './core/header';
import ChatsComponent from './chats/chats';
import Auth from './auth/auth';

export default class RootComponent extends Component {
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <Auth />
        {/*<ChatsComponent />*/}
      </div>
    )
  }
}