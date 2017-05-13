import * as types from '../actions/action-types';

const chatsReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_CHATS:
      return action.chats;
    case types.NEW_CHAT:
      return [...state, action.chat];
    case types.RESET_CHATS:
      return action.chats;
    default:
      return state;
  }
}

export default chatsReducer;
