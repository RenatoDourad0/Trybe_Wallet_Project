import { ADD } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD:
    return {
      ...state,
    };
  default:
    return state;
  }
}

export default wallet;
