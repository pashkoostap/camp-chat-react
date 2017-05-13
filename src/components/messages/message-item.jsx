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
        {/*<div className="right-chat-message__user-photo" style={{ backgroundImage: `url(${this.props.photo})` }}></div>*/}
        <div className="right-chat-notice">
          <span className="right-chat-message__username">{this.props.username}</span>
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
    let oneDayInMs = 1*24*60*60*1000;
    let thisDate = new Date().getTime();
    let newDateFormat = '';
    if (newDate.getTime() < (thisDate - oneDayInMs)) {
      newDateFormat = `${newDate.toISOString().slice(0, 10)} ${newDate.toString().slice(16, 24)}`;
    } else {
      newDateFormat = `${newDate.toString().slice(16, 24)}`;
    }
    return newDateFormat;
  }
  detectContent(text) {
    let textArr = text.split(' ');
    let imagePattern = /\.(jpeg|jpg|gif|png|svg|bmp|tiff)/g;
    let resultText = '';
    let resultImages = '';
    textArr.forEach(str => {
      let parsedLink = parseUrl(str);
      if (parsedLink.protocols.length > 0) {
        if (parsedLink.href.match(imagePattern)) {
          resultImages += `<a class='chat-image-link' href=${str} target='_blank'><img src=${str} /></a> `;
        } else {
          resultText += `<a class='chat-link' href=${str} target='_blank'>${parsedLink.resource}</a> `;
        }
      } else {
        resultText += `${str} `;
      }
    })
    return `${resultText}${resultImages}`;
  }
}