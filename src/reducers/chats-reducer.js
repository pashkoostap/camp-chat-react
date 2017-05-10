import * as types from '../actions/action-types';

const chatsReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_CHATS:
      return action.chats;
    default:
      return state;
  }
}

export default chatsReducer;
