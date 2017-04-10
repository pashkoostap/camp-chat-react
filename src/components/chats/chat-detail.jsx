import React, { Component } from 'react';
import Styles from './chat-detail.scss';
import MessageNew from '../messages/message-new';
import MessagesList from '../messages/messages-list';

export default class ChatDetail extends Component {
  render() {
    return (
      <div className="ct-chat-detail">
        <MessagesList />
        <MessageNew />
      </div>     
    )
  }
} 