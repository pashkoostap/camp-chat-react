import React, { Component } from 'react';
import Styles from './message-item.scss';

export default class NewMessageForm extends Component {
  render() {
    return (
      <li class="right-chat-message">
        <div class="right-chat-message__user-photo" style={{ backgroundImage: "url(assets/img/avatar__1.jpg)" }}></div>
        <div class="right-chat-notice">
          <p class="right-chat-notice__content">
            Message text
            </p>
        </div>
        <span class="right-chat-message__date">23-10-2017 17-30</span>
      </li>
    )
  }
}