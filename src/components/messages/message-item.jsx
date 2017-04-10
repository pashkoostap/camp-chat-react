import React, { Component } from 'react';
import Styles from './message-item.scss';

export default class MessageItem extends Component {
  render() {
    return (
      <li className="right-chat-message  to-user">
        <div className="right-chat-message__user-photo" style={{ backgroundImage: "url(assets/img/avatar__1.jpg)" }}></div>
        <div className="right-chat-notice">
          <p className="right-chat-notice__content">
            Message text
            </p>
        </div>
        <span className="right-chat-message__date">23-10-2017 17-30</span>
      </li>
    )
  }
}