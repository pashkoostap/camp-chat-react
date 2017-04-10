import React, { Component } from 'react';
import Styles from './message-new.scss';

export default class MessageNew extends Component {
  render() {
    return (
      <form action="/" className="right-chat-form">
        <textarea name="message"
          className="right-chat-form__textarea"
          placeholder="Type something"></textarea>
        <button
          type="submit"
          className="right-chat-form__submit  chat-icon-send-button"></button>
      </form>
    )
  }
}