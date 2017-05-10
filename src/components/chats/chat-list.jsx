import React, { Component } from 'react';
import Styles from './chat-list.scss';
import ChatListItem from './chat-list-item';
import CHATS from '../../mock-data/mock-chats';

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: CHATS
    }
  }
  renderChatList() {
    return this.props.chats.map(chat => {
      return <ChatListItem key={chat._id} chat={chat} />
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