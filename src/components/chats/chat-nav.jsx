import React, { Component } from 'react';
import Styles from './chat-nav.scss';

export default class ChatNav extends Component {
  constructor(props) {
    super(props);
    
    this.onPanelOpen = this.onPanelOpen.bind(this);
  }
  render() {
    return (
      <nav className="left-chat-nav">
        <button className="left-chat-nav__open  osp-chat-nav-btn  active" onClick={this.onPanelOpen}></button>
        <form className="chat-search-panel">
          <input
            type="text"
            className="chat-search-panel__input"
            name="search" />
          <button type="submit" className="chat-search-panel__search-btn    osp-chat-nav-btn  chat-icon-search"></button>
        </form>
        <button className="left-chat-nav__menu  osp-chat-nav-btn" ></button >
        <ul className="osp-chat-menu  hidden">
          <li className="osp-chat-menu__item">
            <a>New chat</a>
          </li >
          <li className="osp-chat-menu__item  osp-chat-menu__item--divider"></li>
          <li className="osp-chat-menu__item">
            <a>Menu item</a>
          </li >
        </ul >
      </nav >
    )
  }
  onPanelOpen(e) {
    e.target.classList.toggle('active');
    this.props.togglePanel();
  }
}