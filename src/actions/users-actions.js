import * as types from './action-types';
import { API_CONFIG } from '../api/api-config';

export function resetUsers() {
  return {
    type: types.RESET_USERS,
    users: []
  }
}

export function loadUsers(callback) {
  return function (dispatch) {
    return window.fetch(`${API_CONFIG.USERS}`)
      .then(res => res.json())
      .then(users => {
        callback()
        dispatch({
          type: types.LOAD_USERS,
          users
        });
      })
      .catch(err => {
        throw (err);
      });
  };
}