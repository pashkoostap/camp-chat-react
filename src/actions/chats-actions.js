import * as types from './action-types';
import { API_CONFIG } from '../api/api-config';

export function loadChats(userID) {
  return function (dispatch) {
    return window.fetch(`${API_CONFIG.GET_CHATS}/${userID}`)
      .then(res => res.json())
      .then(chats => {
        dispatch({
          type: types.LOAD_CHATS,
          chats
        });
      })
      .catch(err => {
        throw (err);
      });
  };
}

export function resetChats() {
  return {
    type: types.RESET_CHATS,
    chats: []
  }
}