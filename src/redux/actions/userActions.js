import { LOGIN } from './actionTypes';

const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export default loginAction;
