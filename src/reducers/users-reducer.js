import * as types from '../actions/action-types';

const reducerNameInitialState = {};

const reducerName = (state = reducerNameInitialState, action) => {
  switch (action.type) {
    case types.USER_JOINED:
      return state;
    case types.USER_LEAVED:
      return state;
    default:
      return state;
  }
}

export default reducerName;
