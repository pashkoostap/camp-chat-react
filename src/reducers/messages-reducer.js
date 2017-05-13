import * as types from '../actions/action-types';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_MESSAGES:
      return action.messages;
    case types.CREATE_MESSAGE:
      return [...state, action.message];
    case types.NEW_MESSAGE:
      return [...state, action.message];
    case types.RESET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
}

export default messagesReducer;
