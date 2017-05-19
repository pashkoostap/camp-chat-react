import React from 'react';
import styles from './chat-users.scss';

class ChatUsers extends React.Component {
  constructor(props) {
    super(props);
    this.isUserOnline = this.isUserOnline.bind(this);
  }

  render() {
    return (
      <div className={'modal-window-wrap' + (this.props.visible ? ' visible' : ' hidden')}>
        <div className='modal-window-inner  app-chat-users'>
          <button className='modal-window-inner__close  chat-icon-close' onClick={() => { this.props.close() }}></button>
          <ul className='app-chat-users-list'>
            {this.renderUsers()}
          </ul >
        </div >
      </div>
    );
  }

  isUserOnline(user, connectedUsers) {
    if (connectedUsers) {
      let isUserConnected = connectedUsers.filter(connectedUser => connectedUser.username == user.username)[0];
      if (isUserConnected) {
        return <span className="app-chat-users-list__status online">online</span>
      } else {
        return <span className="app-chat-users-list__status offline">offline</span>
      }
    }
  }

  renderUsers() {
    let { chat, connectedUsers } = this.props;
    if (chat) {
      return chat.users.map(user => {
        this.isUserOnline(user, connectedUsers)
        return (
          <li className='app-chat-users-list__item' key={user._id} >
            {/*<div className='app-chat-users-list__photo' style={{ backgroundImage: `url('assets/img/avatar__4.jpg')` }}></div>*/}
            <div className='app-chat-users-list__photo' style={{ backgroundImage: `url(${user.photo})` }}></div>
            {this.isUserOnline(user, connectedUsers)}
            <span className='app-chat-users-list__name'>{user.username}</span>
          </li >
        )
      })
    }
  }
}


export default ChatUsers;
