import React from 'react';
import styles from './chat-info.scss';
import ChatUsers from './chat-users';

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxWidth: 100,
      chatInfoVisible: true,
      searchFieldVisible: true,
      chatUsersVisible: false
    }
    this.renderAttendeesList = this.renderAttendeesList.bind(this);
    this.setAttendessWrapWidth = this.setAttendessWrapWidth.bind(this);
    this.chatInfoWrapShow = this.chatInfoWrapShow.bind(this);
    this.searchFieldOpen = this.searchFieldOpen.bind(this);
    this.closeChatUsers = this.closeChatUsers.bind(this);
    this.openChatUsers = this.openChatUsers.bind(this);
  }

  componentDidUpdate() {
    if (this.props.chat) {
      let maxWidth = this.setAttendessWrapWidth(this.props.chat.users, 50, 30);
      if (this.state.maxWidth != maxWidth) {
        this.setState((state, props) => { return { maxWidth } })
      }
    }
  }

  renderAttendeesList(chat) {
    if (chat) {
      return chat.users.map((user, i) => {
        return (
          // <li key={user._id} className={'chat-info-attendees__user  user__' + i} style={{ backgroundImage: `url('assets/img/avatar__4.jpg')` }}></li>
          <li key={user._id} className={'chat-info-attendees__user  user__' + i} style={{ backgroundImage: `url(${user.photo})` }}></li>
        )
      })
    }
  }

  chatInfoWrapShow(e) {
    let btn = e.target;
    this.setState({ chatInfoVisible: !this.state.chatInfoVisible });
    btn.classList.toggle('clicked');
    if (btn.classList.contains('clicked')) {
      btn.innerText = 'Hide chat info';
    } else {
      btn.innerText = 'Show chat info';
    }
  }

  setAttendessWrapWidth(users, elWidth, elOffset) {
    if (!elOffset) {
      return users.length * elWidth;
    } else {
      return users.length * elWidth - (users.length - 1) * elOffset;
    }
  }

  searchFieldOpen(e) {
    this.setState({ searchFieldVisible: !this.state.searchFieldVisible })
  }

  closeChatUsers() {
    this.setState({ chatUsersVisible: false })
  }

  openChatUsers() {
    this.setState({ chatUsersVisible: true })
  }

  render() {
    let { visible, chat } = this.props;
    return (
      <div className={'chan-info-wrap  ' + (visible ? ' ' : ' hidden') + (this.state.chatInfoVisible ? ' visible' : ' ')}>
        <button
          type='button'
          className='chan-info-wrap__show-btn  chat-btn  clicked'
          onClick={this.chatInfoWrapShow}>Hide chat info</button>
        <ul
          className='chat-info-attendees'
          style={{ maxWidth: this.state.maxWidth }}
          onClick={this.openChatUsers}>
          {this.renderAttendeesList(chat)}
        </ul >
        <span className='chat-info__chat-name'>{chat ? chat.chatname : ''}</span>
        <div className={'chat-info-search ' + (this.state.searchFieldVisible ? ' visible' : ' ')} >
          <button
            type='button'
            className='chat-info-search__btn  chat-btn  chat-icon-search'
            onClick={this.searchFieldOpen}></button>
          <input type='text'
            className='chat-info-search__input'
            placeholder='Search...'
            name='search' />
        </div>
        <button type='button' className='chat-info__leave  chat-btn  chat-icon-sign-out' ></button >

        <ChatUsers
          visible={this.state.chatUsersVisible}
          close={this.closeChatUsers}
          chat={chat}
          connectedUsers={this.props.connectedUsers} />
      </div>
    );
  }
}

export default ChatInfo;
