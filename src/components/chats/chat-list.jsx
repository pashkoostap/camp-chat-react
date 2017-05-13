import React, { Component } from 'react';
import Styles from './chat-list.scss';
import ChatListItem from './chat-list-item';

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedChats: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let { chats } = nextProps;
    if (chats.length > 0) {
      chats.forEach(chat => {
        if (this.state.joinedChats.length == 0) {
          this.props.socket().emit('join-room', chat._id);
          this.setState((state, props) => { return { joinedChats: ['dasds'] } })
        }
      })
    }
  }
  componentWillUnmount() {
    let chats = this.props.chats;
    if (chats.length > 0) {
      chats.forEach(chat => {
        this.props.socket().emit('leave-room', chat._id);
      })
    }
  }
  renderChatList() {
    return this.props.chats.map(chat => {
      return <ChatListItem 
        key={chat._id} 
        chat={chat} 
        selectChat={this.props.selectChat}
        selectedChat={this.props.selectedChat} />
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