import React, { Component } from 'react';
import Styles from './message-new.scss';

export default class MessageNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
    this.socketInit = false;
    this.createNewMessage = this.createNewMessage.bind(this);
    this.changeMessageText = this.changeMessageText.bind(this);
  }
  render() {
    return (
      <form action="/" className="right-chat-form">
        <textarea name="message"
          className="right-chat-form__textarea"
          placeholder="Type something"
          value={this.state.msg}
          onChange={this.changeMessageText}></textarea>
        <button
          type="submit"
          className="right-chat-form__submit  chat-icon-send-button"
          onClick={this.createNewMessage}></button>
      </form>
    )
  }
  componentWillUpdate() {
    if (!this.socketInit) {
      this.socketInit = true;
      this.props.socket().on('message', msg => {
        this.props.sendMessage(msg);
      })
    }
  }
  changeMessageText(e) {
    this.setState({ msg: e.target.value });
  }
  createNewMessage(e) {
    e.preventDefault();
    this.props.socket().emit('message', this.state.msg);
    this.setState({ msg: '' });
  }
}
