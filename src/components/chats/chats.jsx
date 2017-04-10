import React, { Component } from 'react';
import Styles from './chats.scss';
import ChatNav from './chat-nav';
import ChatList from './chat-list';
import ChatDetail from './chat-detail';

export default class ChatsComponent extends Component {
  render() {
    return (
      <div className="ct-chats">
        <div className="osp-chat">
          <div className="left-chat-wrap  visible">
            <ChatNav />
            <ChatList />
          </div>

          <div className="right-chat-wrap">
            <ChatDetail />
          </div>
        </div>
      </div>
    )
  }
}