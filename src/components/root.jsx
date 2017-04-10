import React, { Component } from 'react';
import Header from './core/header';
import ChatsComponent from './chats/chats';

export default class RootComponent extends Component {
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <ChatsComponent />
      </div>
    )
  }
}