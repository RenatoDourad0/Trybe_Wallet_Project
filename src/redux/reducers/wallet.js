import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  GET_CURRENCIES,
  GET_CURRENCIES_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  rates: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: {
    currencies: '',
    rates: '',
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currencie) => currencie !== 'USDT'),
    };
  case GET_CURRENCIES_ERROR:
    return {
      ...state,
      error: {
        currencies: action.payload,
      },
    };
  default:
    return state;
  }
}

export default wallet;
