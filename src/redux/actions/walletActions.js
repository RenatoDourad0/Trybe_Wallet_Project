import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  GET_CURRENCIES,
  GET_CURRENCIES_ERROR,
} from './actionTypes';

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const removeExpenseAction = (payload) => ({
  type: REMOVE_EXPENSE,
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
  .then((data) => ({ data }));
