import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as io from 'socket.io-client';
import { API_CONFIG } from '../api/api-config';

import Header from './core/header';
import Auth from './auth/auth';
import Chats from './chats/chats';
import Home from './home';

export default class RootComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: 'temp'
    }
    this.socket;
    this.initSocket = this.initSocket.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <button onClick={this.initSocket}>Init Socket</button>
        <button onClick={this.sendMessage}>Send message</button>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={() => { return (<Auth text={this.state.text} />) }} />
          <Route path='/chat' component={() => { return (<Chats text={this.state.text} />) }} />
        </Switch>
      </div>
    )
  }
  initSocket() {
    console.log('asds')
    this.socket = io.connect(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      console.log(this.socket);
      this.socket.emit('authenticate', { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhc2hrb09zdGFwIn0.qDBVTt_QG2BB8jnqKvJwUxQTTMQfQnny1_XfoEMGC7w" });
      console.log(this.socket);
    })
    this.socket.on('message', msg => { console.log(msg) })
  }
  sendMessage() {
    this.socket.emit('message', 'Hi')
  }
}