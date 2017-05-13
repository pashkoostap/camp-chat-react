import React, { Component } from 'react';
import { withRouter } from 'react-router'
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
      isLoggedUser: this.props.userInfo.user !== undefined
    }

    this.onUserLogin = this.onUserLogin.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
    this.changeIsLoggedState = this.changeIsLoggedState.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.getSocket = this.getSocket.bind(this);
  }
  render() {
    return (
      <div className="app-wrap">
        <Header
          logout={this.onUserLogout}
          changeIsLoggedState={this.changeIsLoggedState}
          user={this.props.userInfo} />
        {
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/auth' component={() => {
              return (
                <Auth
                  login={this.onUserLogin}
                  changeIsLoggedState={this.changeIsLoggedState}
                  initSocket={this.initSocket} />
              )
            }} />
            <Route path='/chat' component={() => {
              return (
                <Chats
                  socket={this.getSocket} />
              )
            }} />
          </Switch>
        }
      </div>
    )
  }
  componentDidMount() {
    if (this.state.isLoggedUser && window.socket == undefined) {
      this.initSocket(this.props.userInfo.token);
    }
  }
  initSocket(JWT) {
    window.socket = io.connect(API_CONFIG.SOCKET);
    window.socket.on('connect', () => {
      window.socket.emit('authenticate', { token: JWT });
      console.log(window.socket);
    })
    window.socket.on('message', msg => console.log(msg));
    // window.socket.on('join-room', msg => console.log('join-room', msg));
    // window.socket.on('leave-room', msg => console.log('leave-room', msg));
    // window.socket.on('new-chat', chat => console.log('new-chat', chat));
  }
  getSocket() {
    return window.socket;
  }
  onUserLogin(userInfo) {
    this.props.actions.userLogin(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.props.history.push('/chat');
  }
  onUserLogout(userInfo) {
    this.props.actions.userLogout(userInfo);
    localStorage.setItem('userInfo', '');
    this.props.history.push('/auth');
    setTimeout(() => { window.socket = undefined }, 5000)

  }
  changeIsLoggedState() {
    this.setState({ isLoggedUser: !this.state.isLoggedUser });
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootComponent));