import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as messagesActions from '../../actions/messages-actions';

import Styles from './chat-detail.scss';
import MessageNew from '../messages/message-new';
import MessagesList from '../messages/messages-list';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.state = {
      isMessagesLoading: false
    }
  }
  render() {
    return (
      <div className="ct-chat-detail">
        <MessagesList
          messages={this.props.messages}
          user={this.props.userInfo} />
        <MessageNew
          sendMessage={this.sendNewMessage}
          socket={this.props.socket} />
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive')
    if (nextProps.messages == 0 && this.state.isMessagesLoading == false) {
      this.props.actions.loadMessages(nextProps.selectedChat);
      this.setState((state, props) => {
        return {
          isMessagesLoading: true
        }
      })
    }
  }
  shouldComponentUpdate() {
    console.log('should update')
    return true 
  }
  componentDidUpdate() {
    // this.setState((state, props) => {
    //   return {
    //     isMessagesLoading: false
    //   }
    // })
    console.log('did update')
  }
  sendNewMessage(msg) {
    this.props.actions.createMessage(msg);
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