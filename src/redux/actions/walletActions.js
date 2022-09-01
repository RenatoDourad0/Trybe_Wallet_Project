import {
  ADD_EXPENSE,
  GET_CURRENCIES,
  GET_CURRENCIES_ERROR,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDITED_EXPENSE,
  SAVE_EXPENSES
} from './actionTypes';

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

const getCurrenciesError = (payload) => ({
  type: GET_CURRENCIES_ERROR,
  payload,
});

export const fetchCurrenciesAction = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => dispatch(getCurrencies(data)))
  .catch((error) => dispatch(getCurrenciesError(error.message)));

export const fetchExchangeRatesAction = () => () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => (data));

export const removeExpenseAction = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editExpenseAction = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const submitEditedExpenseAction = (payload) => ({
  type: SUBMIT_EDITED_EXPENSE,
  payload,
});

export const saveExpesesToStoreAction = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});
