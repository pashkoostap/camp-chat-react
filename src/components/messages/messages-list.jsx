import React, { Component } from 'react';
import Styles from './messages-list.scss';
import MessageItem from './message-item';

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.msgList = null;
    this.isMessageFromThisUser = this.isMessageFromThisUser.bind(this);
  }
  render() {
    return (
      <ul className="right-chat-messages" ref={(msgList) => { this.msgList = msgList }}>
        {this.renderMessages()}
      </ul>
    )
  }
  setScrollHeight() {
    this.msgList.scrollTop = this.msgList.scrollHeight - this.msgList.offsetHeight;
  }
  componentDidMount() {
    this.setScrollHeight()
  }
  componentDidUpdate() {
    this.setScrollHeight()
  }
  isMessageFromThisUser(msg) {
    let msgUsername = msg.user.username;
    let propsUser = this.props.user.user;
    if (propsUser != undefined) {
      if (msgUsername == propsUser.username) {
        return true;
      }
    }
    else {
      return false;
    }

  }
  renderMessages() {
    return this.props.messages.map(msg => {
      return <MessageItem
        key={msg.time}
        text={msg.msg}
        user={msg.user.username}
        time={msg.time}
        isFromMe={this.isMessageFromThisUser(msg)} />
    })
  }
}