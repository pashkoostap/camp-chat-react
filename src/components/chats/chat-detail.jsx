import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Styles from './chat-detail.scss';
import MessageNew from '../messages/message-new';
import MessagesList from '../messages/messages-list';

class ChatDetail extends Component {
  render() {
    return (
      <div className="ct-chat-detail">
        <MessagesList messages={this.props.messages} />
        <MessageNew />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(ChatDetail);