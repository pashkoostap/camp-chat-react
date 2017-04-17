import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as io from 'socket.io-client';
import { API_CONFIG } from '../api/api-config';
import * as userActions from '../actions/user-actions';

import Header from './core/header';
import Auth from './auth/auth';
import Chats from './chats/chats';
import Home from './home';

class RootComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: 'temp',
      isLoggedUser: true
    }
    this.socket;

    this.initSocket = this.initSocket.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onUserLogin = this.onUserLogin.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
    this.showChatWindow = this.showChatWindow.bind(this);
  }
  render() {
    console.log(this.props.userInfo);
    return (
      <div className="app-wrap">
        <Header logout={this.onUserLogout} />
        <button onClick={this.initSocket}>Init Socket</button>
        <button onClick={this.sendMessage}>Send message</button>
        {/*<Switch>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={() => {
            return (<Auth login={this.onUserLogin} />)
          }} />
          <Route path='/chat' component={() => {
            return ()
          }} />
        </Switch>*/
        }
        <Auth login={this.onUserLogin} visible={this.state.isLoggedUser} showChat={this.showChatWindow}/>
        <Chats text={this.state.text} visible={!this.state.isLoggedUser} />
      </div>
    )
  }
  initSocket() {
    this.socket = io.connect(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      console.log(this.socket);
      this.socket.emit('authenticate', { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhc2hrb09zdGFwIn0.qDBVTt_QG2BB8jnqKvJwUxQTTMQfQnny1_XfoEMGC7w" });
      console.log(this.socket);
    })
    this.socket.on('message', msg => { console.log(msg) })
  }
  sendMessage() {
    // this.socket.emit('message', 'Hi')
  }
  onUserLogin(userInfo) {
    this.props.actions.userLogin(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log(localStorage.getItem('userInfo'));
  }
  onUserLogout(userInfo) {
    this.props.actions.userLogout(userInfo);
    localStorage.setItem('userInfo', '');
    console.log(localStorage.getItem('userInfo'));
  }
  showChatWindow() {
    this.setState({ isLoggedUser: false });
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);