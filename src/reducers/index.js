import { combineReducers } from 'redux';
import userInfo from './user-reducer';
import messages from './messages-reducer';

const rootReducers = combineReducers({
  userInfo,
  messages
})

export default rootReducers;