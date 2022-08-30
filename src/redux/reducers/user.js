import { LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  isLogged: false,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
      isLogged: true,
    };
  default:
    return state;
  }
}

export default user;
