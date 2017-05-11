import * as types from './action-types';
import { API_CONFIG } from '../api/api-config';

export function createMessage(msg) {
  return {
    type: types.MESSAGE_NEW,
    message: msg
  }
}

export function resetMessages() {
  return {
    type: types.RESET_MESSAGES,
    messages: []
  }
}

export function loadMessages(chatID, callback) {
  return function (dispatch) {
    return window.fetch(`${API_CONFIG.GET_MESSAGES_CHAT_ID}/${chatID}`)
      .then(res => res.json())
      .then(messages => {
        callback()
        dispatch({
          type: types.LOAD_MESSAGES,
          messages
        });
      })
      .catch(err => {
        throw (err);
      });
  };
}