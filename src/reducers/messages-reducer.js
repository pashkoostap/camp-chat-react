import * as types from '../actions/action-types';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_MESSAGES:
      return action.messages;
    case types.MESSAGE_NEW:
      return [...state, action.message];
    default:
      return state;
  }
}

export default messagesReducer;
