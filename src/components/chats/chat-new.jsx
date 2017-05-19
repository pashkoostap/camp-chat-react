import React, { Component } from 'react';
import styles from './chat-new.scss';

import { API_CONFIG } from '../../api/api-config';
import * as validators from '../../utils/validators';

class ChatNew extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newChat: {
        users: []
      },
      photoLoadingHint: '',
      isPhotoLoading: false,
      labelFileInputValut: 'Upload photo',
      photoURL: '',
      isChatNameValid: null,
      isChatNameTouched: false,
      isSelectedUsersValid: false,
      filterValue: ''
    }
    this.renderUsersList = this.renderUsersList.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.setUsersState = this.setUsersState.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.validateChatName = this.validateChatName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className={'modal-window-wrap' + (this.props.visible ? ' visible' : ' hidden')}>
        <div className='modal-window-inner  new-chat-inner'>
          <button className='modal-window-inner__close  chat-icon-close' onClick={() => { this.props.hideNewChat() }}></button>
          <form className='new-chat-form'>
            <input type='text' className='new-chat-form__input' placeholder='Enter chat name' onBlur={this.validateChatName} />
            <span className={'new-chat-form__hint' + (this.state.isChatNameValid || !this.state.isChatNameTouched ? ' hidden' : ' ')}>Chat name must be at least 6 characters</span>

            <label className='new-chat-form__input  new-chat-form__input--label-file' onChange={(e) => { this.onFileUpload(e) }}>
              {this.state.labelFileInputValut}
              <input type='file' className='new-chat-form__input  new-chat-form__input--file' />
            </label>

            <span className='new-chat-form__hint'>{this.state.photoLoadingHint}</span>

            <div className='new-chat-form-search'>
              <input
                type='text'
                className='new-chat-form__input  filter'
                name='filter-users'
                value={this.state.filterValue}
                placeholder='Search user by name'
                onChange={(e) => { this.setState({ filterValue: e.target.value }) }} />
              <button type='button' className='new-chat-form-search__btn  chat-btn  chat-icon-close' onClick={(e) => { this.setState({ filterValue: '' }) }}></button>
            </div>

            <ul className='new-chat-users'>
              {this.renderUsersList(this.state.filterValue)}
            </ul>

            <button type='submit' className='new-chat-form__btn' disabled={!this.state.isChatNameValid || !this.state.isSelectedUsersValid}>Create new chat</button>
          </form>
        </div>
      </div>
    );
  }

  renderUsersList(filterValue) {
    let { users, user } = this.props;
    if (users) {
      let username;
      if (user.user) {
        username = user.user.username;
      }
      return users.map(user => {
        if (username != user.username && user.username.match(new RegExp(filterValue, 'gi'))) {
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

  setUsersState(users, isValid) {
    this.setState((state, props) => {
      return {
        newChat: {
          users
        },
        isSelectedUsersValid: isValid
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
      this.setUsersState(users, users.length > 0);
    } else {
      users.splice(userObj, 1);
      this.setUsersState(users, users.length > 0);
    }
  }

  onFileUpload(event) {
    let input = event.target;
    let file = input.files[0];
    if (file.type.match('image/*')) {
      this.setState((state, props) => {
        return {
          isPhotoLoading: true,
          photoLoadingHint: 'Photo is uploading now',
          labelFileInputValut: file.name
        }
      })
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        let body = JSON.stringify({ image: reader.result });
        let init = {
          method: 'post',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body
        }
        window.fetch(API_CONFIG.UPLOAD_IMAGE, init)
          .then(res => res.json())
          .then(resObj => {
            this.setState((state, props) => {
              return {
                photoLoadingHint: 'Photo was successfully uploaded',
                photoURL: resObj.secure_url
              }
            })
          })
      };
    } else {
      this.setState((state, props) => {
        return {
          isPhotoLoading: true,
          photoLoadingHint: 'File must be an image'
        }
      })
    }
  }

  validateChatName(e) {
    let isValid = validators.validateString(e.target.value, 6);
    this.setState((state, props) => {
      return {
        isChatNameValid: isValid,
        isChatNameTouched: true
      }
    })
  }
}

export default ChatNew;
