import { combineReducers } from 'redux';
import userInfo from './user-reducer';
import messages from './messages-reducer';
import chats from './chats-reducer';

const rootReducers = combineReducers({
  userInfo,
  messages,
  chats
})

export default rootReducers;