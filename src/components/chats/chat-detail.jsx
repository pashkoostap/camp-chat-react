import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as messagesActions from '../../actions/messages-actions';

import Styles from './chat-detail.scss';
import MessageNew from '../messages/message-new';
import MessagesList from '../messages/messages-list';
import ChatInfo from './chat-info';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.state = {
      isMessagesLoading: false,
      selectedChat: '',
      spinnerVisible: false,
      connectedUsers: null
    }
    this.subscribeToSocketEvents = this.subscribeToSocketEvents.bind(this);
    this.updateConnectedUsers = this.updateConnectedUsers.bind(this);
  }

  render() {
    return (
      <div className="ct-chat-detail">
        <ChatInfo
          visible={this.state.selectedChat}
          chat={this.props.chat}
          connectedUsers={this.state.connectedUsers}
          user={this.props.userInfo}
          leaveChat={this.props.leaveChat} />
        <h1 className={"ct-chat-detail__title " + (this.state.selectedChat ? "hidden" : "visible")}>Please select chat</h1>
        <MessagesList
          spinnerVisible={this.state.spinnerVisible}
          messages={this.props.messages}
          user={this.props.userInfo}
          selectedChat={this.props.selectedChat} />
        <MessageNew
          visible={this.state.selectedChat}
          sendMessage={this.sendNewMessage}
          socket={this.props.socket}
          selectedChat={this.props.selectedChat} />
      </div>
    )
  }

  updateConnectedUsers(connectedUsers) {
    this.setState((state, props) => { return { connectedUsers } })
  }

  subscribeToSocketEvents(socket) {
    if (socket != undefined) {
      socket.on('join', res => {
        this.updateConnectedUsers(res.connectedUsers)
      })
      socket.on('leave', res => {
        this.updateConnectedUsers(res.connectedUsers)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    let { selectedChat, socket } = nextProps;
    if (selectedChat && selectedChat !== this.state.selectedChat) {
      if (!this.state.isMessagesLoading) {
        this.setState((state, props) => {
          return {
            isMessagesLoading: true,
            selectedChat: nextProps.selectedChat,
            spinnerVisible: true
          }
        })
        this.props.actions.loadMessages(nextProps.selectedChat, () => {
          this.setState((state, props) => {
            return {
              isMessagesLoading: false,
              spinnerVisible: false
            }
          })
        });
      }
    }
  }

  componentDidMount() {
    this.subscribeToSocketEvents(this.props.socket())
  }

  componentWillUnmount() {
    this.props.actions.resetMessages();
  }

  sendNewMessage(msg) {
    if (this.state.selectedChat == msg.chatID) {
      this.props.actions.createMessage(msg);
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messagesActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatDetail));