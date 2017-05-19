import React, { Component } from 'react';
import styles from './chat-new.scss';

class ChatNew extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newChat: {
        users: []
      }
    }
    this.renderUsersList = this.renderUsersList.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.setUsersState = this.setUsersState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className={'modal-window-wrap' + (this.props.visible ? ' visible' : ' hidden')}>
        <div className='modal-window-inner  new-chat-inner'>
          <button className='modal-window-inner__close  chat-icon-close' onClick={() => { this.props.hideNewChat() }}></button>
          <form className='new-chat-form'>
            <input type='text' className='new-chat-form__input' placeholder='Enter chat name' />

            <label className='new-chat-form__input  new-chat-form__input--label-file'>
              Upload photo
            <input type='file' className='new-chat-form__input  new-chat-form__input--file' />
            </label>

            <span className='new-chat-form__hint'></span>

            <div className='new-chat-form-search'>
              <input type='text' className='new-chat-form__input  filter' placeholder='Search user by name' />
              <button type='button' className='new-chat-form-search__btn  chat-btn  chat-icon-close'></button>
            </div>

            <ul className='new-chat-users'>
              {this.renderUsersList()}
            </ul>

            <button type='submit' className='new-chat-form__btn'>Create new chat</button>
          </form>
        </div>
      </div>
    );
  }
  renderUsersList() {
    let { users, user } = this.props;
    if (users) {
      let username;
      if (user.user) {
        username = user.user.username;
      }
      return users.map(user => {
        if (username != user.username) {
          return (
            <li className='new-chat-user' key={user._id} onClick={(e) => { this.onAddUser(e, user) }}>
              <div className='new-chat-user__photo' style={{ backgroundImage: `url(${user.photo})` }}></div>
              <span className='new-chat-user__info'>{user.username}</span>
            </li>
          )
        }
      })
    }
  }

  setUsersState(users) {
    this.setState((state, props) => {
      return {
        newChat: {
          users
        }
      }
    })
  }

  onAddUser(e, user) {
    let selectedEl = e.target;
    let userObj = { username: user.username };
    let users = this.state.newChat.users;
    selectedEl.classList.toggle('selected');
    if (selectedEl.classList.contains('selected')) {
      users.push(userObj);
      this.setUsersState(users);
    } else {
      users.splice(userObj, 1);
      this.setUsersState(users);
    }
  }
}

export default ChatNew;
