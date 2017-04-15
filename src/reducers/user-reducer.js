import * as types from '../actions/action-types';

const userReducerInitialState = { isLogged: false };

const userReducer = (state = userReducerInitialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return { isLogged: true };
    case types.LOGOUT_USER:
      return { isLogged: false };
    default:
      return state;
  }
}

export default userReducer;
