import React, { Component } from 'react';
import Styles from './messages-list.scss';
import MessageItem from './message-item';

export default class MessagesList extends Component {
  render() {
    return (
      <ul className="right-chat-messages">
        <MessageItem />
      </ul>
    )
  }
}