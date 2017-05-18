import React, { Component } from 'react';
import styles from './chat-new.scss';

class ChatNew extends Component {
  constructor(props, context) {
    super(props, context);

  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
  }

  render() {
    return (
      <div className={'modal-window-wrap' + (this.props.visible ? ' visible' : ' hidden')}>
        <div className='modal-window-inner  new-chat-inner'>
          <button className='modal-window-inner__close  chat-icon-close' onClick={() => { this.props.hideNewChat() }}></button>
          <h1 className='new-chat-title'>Create new chat</h1>
          <form className='new-chat-form'>
            <input type='text' className='new-chat-form__input' placeholder='Enter chat name' />
            <span className='new-chat-form__hint'>Chat name must be at least 5 characters</span>

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
              <li className='new-chat-user'>
                <span className='new-chat-user__info'>text</span>
              </li>
            </ul>

            <button type='submit' className='new-chat-form__btn'>Create new chat</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatNew;
