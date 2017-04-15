import React, { Component } from 'react';

export default class AuthLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      pass: ''
    }
    this.onLogin = this.onLogin.bind(this);
  }
  render() {
    return (
      <form className="osp-chat-form  osp-chat-form--login">
        <input
          type="text"
          name="username"
          className="osp-chat-form__input"
          placeholder="Username"
          required />
        <span className="osp-chat-form__hint">Please enter username</span>
        <input
          type="password"
          name="password"
          className="osp-chat-form__input"
          placeholder="Password"
          required />
        <span className="osp-chat-form__hint">Your password must be at least 8 latin characters and digits</span>

        <a href="#" className="osp-chat-form__link  osp-chat-form__link--forgot-pass">Forgot password?</a>

        <input
          type="submit"
          className="osp-chat-form__submit  osp-chat-form__submit--login"
          value="Login" />
      </form>
    )
  }
  onLogin(e) {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');

    let myInit = {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({ username: 'userOstap', password: 'userOstap' })
    }
    // fetch('http://eleksfrontendcamp-mockapitron.rhcloud.com/signup', myInit)
    //   .then(() => console.log('sign up'))
    fetch('http://eleksfrontendcamp-mockapitron.rhcloud.com/login', myInit)
      .then((res) => res.json())
      .then((resObj) => {
        console.log(resObj, JSON.stringify(resObj));
        localStorage.setItem('user', JSON.stringify(resObj));
      })
  }
}