import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Style from './navigation.scss';

export default class AppNavigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chat-nav-wrap">
        <div className="chat-nav">
          <nav className="chat-links">
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/auth">Login</Link>
          </nav>

          <div className={"user-profile " + (this.props.user.user !== undefined ? 'visible' : 'hidden')}>
            <a className="user-profile-link">
              <span className="user-profile-link__name">{this.props.user.user !== undefined ? this.props.user.user.username : ''}</span>
              {/*<div className="user-profile-link__photo" style={{ backgroundImage: 'url(assets/img/avatar__1.jpg)' }}></div>*/}
              <div className="user-profile-link__photo" style={{ backgroundImage: `url(${this.props.user.user !== undefined ? this.props.user.user.photo : ''})` }}></div>
            </a>
            <button className="log-out  chat-icon-sign-out" onClick={() => { this.props.logout(); this.props.changeIsLoggedState() }}></button>
          </div>
        </div>
      </div>
    )
  }
}