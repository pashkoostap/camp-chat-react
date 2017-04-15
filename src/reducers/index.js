import { combineReducers } from 'redux';
import user from './user-reducer';
import messages from './messages-reducer';

const rootReducers = combineReducers({
  user,
  messages
})

export default rootReducers;