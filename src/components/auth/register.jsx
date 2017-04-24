import React, { PropTypes } from 'react';
import { API_CONFIG } from '../../api/api-config';

class AuthRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideHints: true,
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.setInputValue = this.setInputValue.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  render() {
    return (
      <form className={"osp-chat-form  osp-chat-form--sign-in " + (this.props.visible ? 'active' : 'hidden')}>
        <input
          type="text"
          className="osp-chat-form__input"
          value={this.state.username}
          name="username"
          onChange={this.setInputValue}
          placeholder="Username" />
        <span className="osp-chat-form__hint hidden" >Your name must be at least 6 latin characters and digits</span>
        <input
          type="email"
          className="osp-chat-form__input"
          value={this.state.email}
          name="email"
          onChange={this.setInputValue}
          placeholder="Email" />
        <span className="osp-chat-form__hint hidden">Please enter valid email</span>
        <input
          type="password"
          className="osp-chat-form__input"
          value={this.state.password}
          name="password"
          onChange={this.setInputValue}
          placeholder="Enter password" />
        <span className="osp-chat-form__hint hidden" >Your password must be at least 8 latin characters and digits</span>
        <input
          type="password"
          className="osp-chat-form__input"
          value={this.state.confirmPassword}
          name="confirmPassword"
          onChange={this.setInputValue}
          placeholder="Confirm password" />
        <span className="osp-chat-form__hint hidden" >The passwords are not identical</span>

        <input type="submit"
          className="osp-chat-form__submit  osp-chat-form__submit--sign-in"
          onClick={this.signUp}
          value="Sign-in" />
      </form>
    );
  }
  setInputValue(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  signUp(e) {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');

    let myInit = {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    }
    fetch(API_CONFIG.SIGNUP, myInit)
      .then(() => {
        console.log('registered new user');
        this.props.switchToLogin();
      });
  }
}

export default AuthRegister;
