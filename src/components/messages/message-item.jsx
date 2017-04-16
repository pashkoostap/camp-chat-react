import React, { Component } from 'react';
import Styles from './message-item.scss';

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="right-chat-message  to-user">
        <div className="right-chat-message__user-photo" style={{ backgroundImage: "url(assets/img/avatar__1.jpg)" }}></div>
        <div className="right-chat-notice">
          <p className="right-chat-notice__content">
            {this.props.text}
          </p>
          <span className="right-chat-message__user">{this.props.user}</span>
        </div>
        <span className="right-chat-message__date">
          {this.convertMessageTime(this.props.time)}
        </span>
      </li>
    )
  }
  convertMessageTime(msgTime) {
    let newDate = new Date(+msgTime);
    let newDateFormat = `${newDate.toISOString().slice(0, 10)} ${newDate.toISOString().slice(11, 19)}`;
    return newDateFormat;
  }
}