import * as types from './action-types';

export function createMessage(msg) {
  return {
    type: types.MESSAGE_NEW,
    message: msg
  }
}