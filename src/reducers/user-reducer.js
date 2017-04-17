import * as types from '../actions/action-types';

const userInfoInit = JSON.parse(localStorage.getItem('userInfo'));

const userReducer = (state = userInfoInit, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return action.userInfo;
    case types.LOGOUT_USER:
      return action.userInfo;
    default:
      return state;
  }
}

export default userReducer;
