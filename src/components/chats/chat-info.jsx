import React from 'react';
import styles from './chat-info.scss';

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxWidth: 100
    }
    this.renderAttendeesList = this.renderAttendeesList.bind(this);
    this.setAttendessWrapWidth = this.setAttendessWrapWidth.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.chat);
  }

  renderAttendeesList(chat) {
    if (chat) {
      return chat.users.map((user, i) => {
        return (
          <li key={user._id} className={'chat-info-attendees__user  user__' + i}></li>
        )
      })
    }
  }

  componentDidUpdate() {
    let maxWidth = this.setAttendessWrapWidth(this.props.chat.users, 50, 30);
    if (this.state.maxWidth != maxWidth) {
      this.setState((state, props) => { return { maxWidth } })
    }
  }

  setAttendessWrapWidth(users, elWidth, elOffset) {
    if (!elOffset) {
      return users.length * elWidth;
    } else {
      return users.length * elWidth - (users.length - 1) * elOffset;
    }
  }

  render() {
    let { visible, chat } = this.props;
    return (
      <div className={'chan-info-wrap  visible ' + (visible ? ' ' : ' hidden')}>
        <button type='button' className='chan-info-wrap__show-btn  chat-btn  clicked'>Hide chat info</button>
        <ul className='chat-info-attendees' style={{ maxWidth: this.state.maxWidth }}>
          {this.renderAttendeesList(chat)}
        </ul >
        <span className='chat-info__chat-name'>{chat ? chat.chatname : ''}</span>
        <div className='chat-info-search  visible' >
          <button type='button' className='chat-info-search__btn  chat-btn  chat-icon-search'></button>
          <input type='text'
            className='chat-info-search__input'
            placeholder='Search...'
            name='search' />
        </div>
        <button type='button' className='chat-info__leave  chat-btn  chat-icon-sign-out' ></button >
      </div>
    );
  }
}

export default ChatInfo;
