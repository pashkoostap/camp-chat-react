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
      isLeftPanelOpen: true
    }
    this.toggleLeftPanel = this.toggleLeftPanel.bind(this);
  }
  render() {
    return (
      <div className={"ct-chats visible"}>
        <div className="osp-chat">
          <div className={"left-chat-wrap " + (this.state.isLeftPanelOpen ? "visible" : "hidden")}>
            <ChatNav togglePanel={this.toggleLeftPanel} />
            <ChatList chats={this.props.chats} />
          </div>

          <div className="right-chat-wrap">
            <ChatDetail socket={this.props.socket} />
          </div>
        </div>
      </div>
    )
  }
  toggleLeftPanel(e) {
    this.setState({ isLeftPanelOpen: !this.state.isLeftPanelOpen });
  }
  loadMessagesForChat(chatID) {

  }
  componentDidMount() {
    if (this.props.userInfo.token) {
      let userID = this.props.userInfo.user._id;
      this.props.actions.loadChats(userID);
    }
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