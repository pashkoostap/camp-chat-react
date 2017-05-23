import React, { Component } from 'react';
import Styles from './chat-nav.scss';

export default class ChatNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }

    this.onPanelOpen = this.onPanelOpen.bind(this);
    this.filterChats = this.filterChats.bind(this);
  }
  render() {
    return (
      <nav className='left-chat-nav'>
        <button className='left-chat-nav__open  osp-chat-nav-btn  active' onClick={this.onPanelOpen}></button>
        <form className='chat-search-panel'>
          <input
            type='text'
            className='chat-search-panel__input'
            value={this.state.searchValue}
            onChange={this.filterChats}
            name='search' />
          <button
            type='submit'
            className='chat-search-panel__search-btn    osp-chat-nav-btn  chat-icon-search'
            onClick={(e) => { e.preventDefault() }}></button>
        </form>
        <button className={'left-chat-nav__menu  osp-chat-nav-btn' + (this.props.isChatMenuOpen ? ' active' : '')} onClick={() => { this.props.toggleChatMenu() }}></button >
        <ul className={'osp-chat-menu' + (this.props.isChatMenuOpen ? ' visible' : ' hidden')}>
          <li className='osp-chat-menu__item' onClick={() => { this.props.showNewChat() }}>
            <a >New chat</a>
          </li >
        </ul >
      </nav >
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedChat) {
      this.setState((state, props) => { return { searchValue: '' } })
    }
  }
  clearSearch() {
    this.setState((state, props))
  }
  filterChats(e) {
    let searchValue = e.target.value;
    this.setState({ searchValue: e.target.value, clearSearch: false })
    this.props.filterChats(searchValue);
  }
  onPanelOpen(e) {
    e.target.classList.toggle('active');
    this.props.togglePanel();
    this.props.hideChatMenu();
  }
}