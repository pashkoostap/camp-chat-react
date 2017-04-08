import React, { Component } from 'react';

export default class AppNavigation extends Component {
  render() {
    return (
      <div className="chat-nav">
        <nav className="chat-links">
          <a>Home</a>
          <a>Chat</a>
          <a>Users</a>
          <a>Login</a>
          <a>Register</a>
        </nav>

        <div className="user-profile">
          <a className="user-profile-link">
            <span className="user-profile-link__name"></span>
            <div className="user-profile-link__photo"></div>
          </a>
          <button className="log-out  chat-icon-sign-out"></button>
        </div >
      </div >
    )
  }
}