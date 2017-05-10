import React, { Component } from 'react';
import Styles from './chat-list.scss';
import ChatListItem from './chat-list-item';

export default class ChatList extends Component {
  constructor(props) {
    super(props);
  }
  renderChatList() {
    return this.props.chats.map(chat => {
      return <ChatListItem key={chat._id} chat={chat} selectChat={this.props.selectChat} />
    })
  }
  render() {
    return (
      <ul className='left-chat-users'>
        {this.renderChatList()}
      </ul >
    )
  }
}