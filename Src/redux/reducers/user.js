import {
  LOGIN_USER_DATA,
  CONVERSATION
} from '../types';
import {appDefaultReducer} from './default';
const INITIAL_STATE = appDefaultReducer.Login;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_DATA: {
      return {...state, loginData: action.payload};
    }
    case CONVERSATION: {
      return {...state, conversation: action.payload};
    }
    default:
      return state;
  }
};
