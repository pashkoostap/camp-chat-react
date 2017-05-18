import * as types from '../actions/action-types';

const reducerNameInitialState = [];

const usersReducer = (state = reducerNameInitialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS:
      return action.users;
    case types.RESET_USERS:
      return action.users;;
    default:
      return state;
  }
}

export default usersReducer;
