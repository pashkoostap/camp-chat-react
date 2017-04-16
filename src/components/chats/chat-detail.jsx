import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messagesActions from '../../actions/messages-actions';

import Styles from './chat-detail.scss';
import MessageNew from '../messages/message-new';
import MessagesList from '../messages/messages-list';

class ChatDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.sendNewMessage = this.sendNewMessage.bind(this);
  }
  render() {
    return (
      <div className="ct-chat-detail">
        <MessagesList messages={this.props.messages} />
        <MessageNew sendMessage={this.sendNewMessage} />
      </div>
    )
  }
  sendNewMessage(msg) {
    this.props.actions.createMessage(msg);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messagesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetail);