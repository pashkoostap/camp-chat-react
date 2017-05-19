import React, { Component } from 'react';
import Styles from './chat-list-item.scss';

export default class ChatListItem extends Component {
  constructor(props) {
    super(props);
    this.selectChat = this.selectChat.bind(this);
  }
  render() {
    let { chatname, photo, _id } = this.props.chat;
    return (
      <li className={'left-chat-user ' + (this.props.selectedChat == _id ? 'active' : '')}
        onClick={this.selectChat}>
        <div className='left-chat-user-photo'>
          {/*<div className='left-chat-user-photo__img' style={{ backgroundImage: 'url(assets/img/avatar__1.jpg' }}></div>*/}
          <div className='left-chat-user-photo__img' style={{ backgroundImage: `url(${photo})` }}></div>
          {/*<span className='left-chat-user-photo__message-badge'>1</span>*/}
        </div>
        <div className='left-chat-user-info'>
          <span className='left-chat-user-info__name'>{chatname}</span>
          {/*<p className='left-chat-user-info__message'>Last message in chat</p>*/}
        </div>
        {/*<span className='left-chat-user__status'>52 m</span>*/}
      </li>
    )
  }
  selectChat(e) {
    this.props.selectChat(this.props.chat._id);
  }
}