import * as types from '../actions/action-types';

const userReducerInitialState = { user: { isLogged: false } };

const userReducer = (state = userReducerInitialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return { user: { isLogged: true } };
    case types.LOGOUT_USER:
      return { user: { isLogged: false } };
    default:
      return state;
  }
}

export default userReducer;
