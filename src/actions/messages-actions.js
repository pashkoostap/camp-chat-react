import * as types from './action-types';
import { API_CONFIG } from '../api/api-config';

export function createMessage(message) {
  return {
    type: types.CREATE_MESSAGE,
    message
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

export function newMessage(message) {
  return {
    type: types.NEW_MESSAGE,
    message
  }
}