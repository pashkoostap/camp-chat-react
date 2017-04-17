import * as types from './action-types';

export function userLogin(userInfo) {
  return {
    type: types.LOGIN_USER,
    userInfo
  }
}

export function userLogout() {
  return {
    type: types.LOGOUT_USER,
    userInfo: {}
  }
}