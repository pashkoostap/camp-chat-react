import React, { Component } from 'react';
import Styles from './chat-list-item.scss';

export default class ChatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewMessage: false,
      newMessages: 0,
      lastMessage: null
    }
    this.selectChat = this.selectChat.bind(this);
  }
  render() {
    let { chatname, photo, _id } = this.props.chat;
    return (
      <li className={'left-chat-user ' + (this.props.selectedChat == _id ? 'active' : '')}
        onClick={this.selectChat}>
        <div className='left-chat-user-photo'>
          <div className='left-chat-user-photo__img' style={{ backgroundImage: `url(${photo})` }}></div>
          <span className={'left-chat-user-photo__message-badge' + (this.state.isNewMessage ? ' visible' : ' hidden')}>{this.state.newMessages}</span>
        </div>
        <div className='left-chat-user-info'>
          <span className='left-chat-user-info__name'>{chatname}</span>
          <p className={'left-chat-user-info__message' + (this.state.lastMessage ? ' visible' : ' hidden')}>{this.state.lastMessage}</p>
        </div>
      </li>
    )
  }
  selectChat(e) {
    this.props.selectChat(this.props.chat._id);
    this.setState({ isNewMessage: false, newMessages: 0, lastMessage: null });
  }
  componentDidMount() {
    if (this.props.socket() !== undefined) {
      this.props.socket().on('message', message => {
        if (message.chatID == this.props.chat._id && message.chatID != this.props.selectedChat) {
          this.setState({ isNewMessage: true, newMessages: this.state.newMessages + 1, lastMessage: message.msg });
        }
      })
    }
  }
  componentWillUnmount() {
    this.props.selectChat('');
  }
}