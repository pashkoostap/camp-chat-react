import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './chats.scss';
import ChatNav from './chat-nav';
import ChatList from './chat-list';
import ChatDetail from './chat-detail';
import { API_CONFIG } from '../../api/api-config';
import * as chatActions from '../../actions/chats-actions';

class ChatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeftPanelOpen: true,
      selectedChat: '',
      chats: []
    }
    this.toggleLeftPanel = this.toggleLeftPanel.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.filterChatsByName = this.filterChatsByName.bind(this);
    this.clearSearchResult = this.clearSearchResult.bind(this);
  }
  render() {
    return (
      <div className={"ct-chats visible"}>
        <div className="osp-chat">
          <div className={"left-chat-wrap " + (this.state.isLeftPanelOpen ? "visible" : "hidden")}>
            <ChatNav
              togglePanel={this.toggleLeftPanel}
              filterChats={this.filterChatsByName}
              selectedChat={this.state.selectedChat} />
            <ChatList
              chats={this.state.chats}
              selectChat={this.selectChat}
              selectedChat={this.state.selectedChat}
              socket={this.props.socket} />
          </div>

          <div className="right-chat-wrap">
            <ChatDetail
              socket={this.props.socket}
              selectedChat={this.state.selectedChat} />
          </div>
        </div>
      </div>
    )
  }
  toggleLeftPanel(e) {
    this.setState({ isLeftPanelOpen: !this.state.isLeftPanelOpen });
  }
  selectChat(chatID) {
    this.setState((state, props) => {
      return {
        selectedChat: chatID
      }
    })
    this.clearSearchResult();
  }
  filterChatsByName(chatname) {
    if (chatname.length > 0) {
      let chatsArr = this.state.chats.filter(chat => chat.chatname.match(new RegExp(chatname, 'gi')));
      this.setState((state, props) => { return { chats: chatsArr } });
    } else {
      this.clearSearchResult();
    }
  }
  clearSearchResult() {
    this.setState((state, props) => { return { chats: this.props.chats } });
  }
  componentWillReceiveProps(nextProps) {
    this.setState((state, props) => { return { chats: nextProps.chats } })
  }
  componentWillMount() {
    if (!this.props.userInfo.token) {
      this.props.history.push('/auth');
    }
  }
  componentDidMount() {
    if (this.props.userInfo.token) {
      let userID = this.props.userInfo.user._id;
      this.props.actions.loadChats(userID);
      if (this.props.socket() !== undefined) {
        this.props.socket().on('new-chat', chat => {
          this.props.actions.newChat(chat);
          chat.users.forEach(user => {
            if (user._id == this.props.userInfo.user._id) {
              this.props.socket().emit('join-room', chat._id)
            }
          })
        })
      }
    }
  }
  componentWillUnmount() {
    this.props.actions.resetChats();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userInfo: state.userInfo,
    chats: state.chats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatsComponent));