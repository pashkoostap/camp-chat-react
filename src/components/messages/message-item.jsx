import React, { Component } from 'react';
import Styles from './message-item.scss';
const parseUrl = require('parse-url');

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.detectContent = this.detectContent.bind(this);
  }
  render() {
    return (
      <li className={"right-chat-message " + (this.props.isFromMe ? 'from-user' : 'to-user')}>
        <div className="right-chat-message__user-photo" style={{ backgroundImage: "url(assets/img/avatar__1.jpg)" }}></div>
        <div className="right-chat-notice">
          <span className="right-chat-message__username">{this.props.user}</span>
          <p className="right-chat-notice__content" dangerouslySetInnerHTML={{ __html: this.detectContent(this.props.text) }}></p>
          <span className="right-chat-message__date">
            {this.convertMessageTime(this.props.time)}
          </span>
        </div>

      </li>
    )
  }
  convertMessageTime(msgTime) {
    let newDate = new Date(+msgTime);
    let newDateFormat = `${newDate.toISOString().slice(0, 10)} ${newDate.toString().slice(16, 24)}`;
    return newDateFormat;
  }
  detectContent(text) {
    let textArr = text.split(' ');
    let resultText = '';
    textArr.forEach(str => {
      let parsedLink = parseUrl(str);
      if (parsedLink.protocols.length > 0) {
        console.log(parsedLink);
        resultText += `<a href=${str} target='_blank'>${parsedLink.resource}</a> `;
      } else {
        resultText += `${str} `;
      }
    })
    console.log(resultText);
    // console.log(parseUrl(text))
    return resultText;
  }
}