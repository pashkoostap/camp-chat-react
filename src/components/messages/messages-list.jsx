import React, { Component } from 'react';
import Styles from './messages-list.scss';
import MessageItem from './message-item';
import Spinner from '../spinner';

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.msgList = null;
    this.isMessageFromThisUser = this.isMessageFromThisUser.bind(this);
  }
  render() {
    let { spinnerVisible } = this.props;
    return (
      <div className="right-chat-messages-wrap">
        <ul className={"right-chat-messages " + (!spinnerVisible ? "visible" : "hidden")} ref={(msgList) => { this.msgList = msgList }}>
          {this.renderMessages()}
        </ul>
        <Spinner visible={spinnerVisible} dark={true} text="Please wait"/>
      </div>
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
    return this.props.messages.map(el => {
      if (typeof el.msg == 'string') {
        return <MessageItem
          key={el.time}
          text={el.msg}
          user={el.user.username}
          time={el.time}
          isFromMe={this.isMessageFromThisUser(el)} />
      }
    })
  }
}