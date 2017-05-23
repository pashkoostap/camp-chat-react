import React, { Component } from 'react';
import { API_CONFIG } from '../../api/api-config';

export default class AuthLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoginError: false
    }
    this.onLogin = this.onLogin.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changeUserPass = this.changeUserPass.bind(this);
  }
  render() {
    return (
      <form className={"osp-chat-form  osp-chat-form--login " + (this.props.visible ? 'active' : 'hidden')}>
        <input
          type="text"
          name="username"
          className="osp-chat-form__input"
          placeholder="Username"
          value={this.state.username}
          onChange={this.changeUserName} />
        <input
          type="password"
          name="password"
          className="osp-chat-form__input"
          placeholder="Password"
          value={this.state.password}
          onChange={this.changeUserPass} />
        <span className={"osp-chat-form__hint" + (this.state.isLoginError ? ' visible' : ' hidden')}>User not found</span>

        <input
          type="submit"
          className="osp-chat-form__submit  osp-chat-form__submit--login"
          value="Login"
          onClick={this.onLogin}
          disabled={!this.state.username || !this.state.password} />
      </form>
    )
  }
  changeUserName(e) {
    this.setState({ username: e.target.value })
  }
  changeUserPass(e) {
    this.setState({ password: e.target.value })
  }
  onLogin(e) {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');

    let myInit = {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    }
    fetch(API_CONFIG.LOGIN, myInit)
      .then((res) => res.json())
      .then((userInfo) => {
        if (userInfo.status == 400) {
          this.setState({ isLoginError: true })
        } else {
          this.setState({ isLoginError: false })
          this.props.initSocket(userInfo.token);
          this.props.login(userInfo);
          this.props.changeIsLoggedState();
        }
      })
  }
}