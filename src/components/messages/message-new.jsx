import React, { Component } from 'react';
import Styles from './message-new.scss';

export default class MessageNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      disabledButton: true
    }
    this.socketInit = false;
    this.createNewMessage = this.createNewMessage.bind(this);
    this.changeMessageText = this.changeMessageText.bind(this);
  }
  render() {
    return (
      <form action="/" className={"right-chat-form " + (this.props.visible ? "visible" : "hidden")}>
        <textarea name="message"
          className="right-chat-form__textarea"
          placeholder="Type something"
          value={this.state.msg}
          onChange={this.changeMessageText}></textarea>
        <button
          type="submit"
          className="right-chat-form__submit  chat-icon-send-button"
          onClick={this.createNewMessage}
          disabled={this.state.disabledButton}></button>
      </form>
    )
  }
  componentWillUpdate() {
    if (!this.socketInit && this.props.socket() !== undefined) {
      this.socketInit = true;
      this.props.socket().on('message', msg => {
        this.props.sendMessage(msg);
      })
    }
  }
  changeMessageText(e) {
    let inputValue = e.target.value;
    if (inputValue) {
      this.setState({
        msg: inputValue,
        disabledButton: false
      });
    } else {
      this.setState({
        msg: inputValue,
        disabledButton: true
      })
    }
  }
  createNewMessage(e) {
    e.preventDefault();
    let message = {
      chatID: this.props.selectedChat,
      text: this.state.msg
    } 
    this.props.socket().emit('message', message);
    this.setState({ msg: '' });
  }
}
