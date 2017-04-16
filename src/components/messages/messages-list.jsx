import React, { Component } from 'react';
import Styles from './messages-list.scss';
import MessageItem from './message-item';

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="right-chat-messages">
        {this.renderMessages()}
      </ul>
    )
  }
  renderMessages() {
    return this.props.messages.map(msg => {
      return <MessageItem
        key={msg.time}
        text={msg.msg}
        user={msg.user.username}
        time={msg.time} />
    })
  }
}