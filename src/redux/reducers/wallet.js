import {
  ADD_EXPENSE,
  GET_CURRENCIES,
  GET_CURRENCIES_ERROR,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDITED_EXPENSE,
  SAVE_EXPENSES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  rates: [],
  expenses: [],
  editor: false,
  idToEdit: -1,
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
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SUBMIT_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
      idToEdit: -1,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
