import React, { Component } from 'react';
import Styles from './chat-list.scss';
import ChatListItem from './chat-list-item';

export default class ChatList extends Component {
  render() {
    return (
      <ul className='left-chat-users'>
        <ChatListItem />
      </ul >
    )
  }
}