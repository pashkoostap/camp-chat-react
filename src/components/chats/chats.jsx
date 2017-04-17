import React, { Component } from 'react';
import Styles from './chats.scss';
import ChatNav from './chat-nav';
import ChatList from './chat-list';
import ChatDetail from './chat-detail';

export default class ChatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeftPanelOpen: true
    }
    this.toggleLeftPanel = this.toggleLeftPanel.bind(this);
  }
  render() {
    console.log(this.props.text)
    return (
      <div className={"ct-chats " + (this.props.visible ? 'visible' : 'hidden')}>
        <div className="osp-chat">
          <div className={"left-chat-wrap " + (this.state.isLeftPanelOpen ? "visible" : "hidden")}>
            <ChatNav togglePanel={this.toggleLeftPanel} />
            <ChatList />
          </div>

          <div className="right-chat-wrap">
            <ChatDetail />
          </div>
        </div>
      </div>
    )
  }
  toggleLeftPanel(e) {
    this.setState({ isLeftPanelOpen: !this.state.isLeftPanelOpen });
  }
}