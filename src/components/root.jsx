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
    this.socket;

    this.onUserLogin = this.onUserLogin.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
    this.changeIsLoggedState = this.changeIsLoggedState.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.getSocket = this.getSocket.bind(this);
  }
  componentDidMount() {
    if (this.props.userInfo.token) {
      this.initSocket(this.props.userInfo.token);
    }
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
  initSocket(JWT) {
    this.socket = io.connect(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: JWT });
      console.log(this.socket);
    })
    this.socket.on('message', msg => {
      console.log(msg)
    })
    this.socket.on('join', msg => {
      console.log('joined', msg)
    })
    this.socket.on('leave', msg => {
      console.log('leaved', msg)
    })
  }
  getSocket() {
    return this.socket;
  }
  onUserLogin(userInfo) {
    this.props.actions.userLogin(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.props.history.push('/chat');
  }
  onUserLogout(userInfo) {
    this.props.actions.userLogout(userInfo);
    localStorage.setItem('userInfo', '');
    window.location.reload();
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