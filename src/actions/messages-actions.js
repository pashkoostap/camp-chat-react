import * as types from './action-types';
import { API_CONFIG } from '../api/api-config';

export function createMessage(msg) {
  return {
    type: types.MESSAGE_NEW,
    message: msg
  }
}

export function loadMessagesSuccess(messages) {
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    messages
  };
}

export function loadMessages() {
  return function (dispatch) {
    return window.fetch(API_CONFIG.MESSAGES)
      .then(res => res.json())
      .then(messages => {
        dispatch(loadMessagesSuccess(messages));
      })
      .catch(err => {
        throw (err);
      });
  };
}