import * as types from '../actions/action-types';
// import MESSAGES from '../mock-data/mock-messages';

// const messagesReducerInitialState = MESSAGES;

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_MESSAGES_SUCCESS:
      return action.messages;
    case types.MESSAGE_NEW:
      return [...state, action.message];
    default:
      return state;
  }
}

export default messagesReducer;
