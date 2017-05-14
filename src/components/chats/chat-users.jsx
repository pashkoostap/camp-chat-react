import React from 'react';
import styles from './chat-users.scss';

class ChatUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'app-chat-users-wrap' + (this.props.visible ? ' visible' : ' hidden')}>
        <div className='app-chat-users'>
          <button className='app-chat-users__close  chat-icon-close' onClick={() => { this.props.close() }}></button>
          <ul className='app-chat-users-list'>
            {this.renderUsers()}
          </ul >
        </div >
      </div>
    );
  }

  renderUsers() {
    let { chat } = this.props;
    if (chat) {
      return chat.users.map(user => {
        return (
          <li className='app-chat-users-list__item' key={user._id} >
            <div className='app-chat-users-list__photo' style={{ backgroundImage: `url('assets/img/avatar__4.jpg')` }}></div>
            {/*<div className='app-chat-users-list__photo' style={{ backgroundImage: `url(${user.photo})` }}></div>*/}
            <span className='app-chat-users-list__name'>{user.username}</span>
          </li >
        )
      })
    }
  }
}


export default ChatUsers;
