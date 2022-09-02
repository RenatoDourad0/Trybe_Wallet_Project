import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

store.subscribe(() => {
  const state = store.getState();
  const { wallet: { expenses } } = state;
  const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  if (expenses.length !== 0) {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  };
  if (expenses.length === 0 && savedExpenses.length === 1) {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  };
})

export default store;
