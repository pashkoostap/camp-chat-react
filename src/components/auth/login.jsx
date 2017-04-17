import React, { Component } from 'react';
import { API_CONFIG } from '../../api/api-config';

export default class AuthLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
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
        <span className="osp-chat-form__hint">Please enter username</span>
        <input
          type="password"
          name="password"
          className="osp-chat-form__input"
          placeholder="Password"
          value={this.state.password}
          onChange={this.changeUserPass} />
        <span className="osp-chat-form__hint">Your password must be at least 8 latin characters and digits</span>

        <a href="#" className="osp-chat-form__link  osp-chat-form__link--forgot-pass">Forgot password?</a>

        <input
          type="submit"
          className="osp-chat-form__submit  osp-chat-form__submit--login"
          value="Login"
          onClick={this.onLogin} />
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
    console.log(this.state)
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
        this.props.login(userInfo);
      })
  }
}