import React, { Component } from 'react';
import Styles from './chat-list.scss';
import ChatListItem from './chat-list-item';
import CHATS from '../../mock-data/mock-chats';

export default class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      chats: CHATS
    }
  }
  renderChatList() {
    return this.state.chats.map(el => {
      return <ChatListItem key={el.id} data={el}/>
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