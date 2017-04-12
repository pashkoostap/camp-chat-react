import React, { Component } from 'react';
import Styles from './login.scss';

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
      <form>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <input type="submit" value="Login" onClick={this.onLogin} />
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