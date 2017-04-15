import * as types from '../actions/action-types';
import MESSAGES from '../mock-data/mock-messages';

const messagesReducerInitialState = MESSAGES;

const messagesReducer = (state = messagesReducerInitialState, action) => {
  switch (action.type) {
    case types.MESSAGE_NEW:
      return state;
    default:
      return state;
  }
}

export default messagesReducer;
