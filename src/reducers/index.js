import { combineReducers } from 'redux';
import userInfo from './user-reducer';
import messages from './messages-reducer';
import chats from './chats-reducer';
import users from './users-reducer';

const rootReducers = combineReducers({
  userInfo,
  messages,
  chats,
  users
})

export default rootReducers;