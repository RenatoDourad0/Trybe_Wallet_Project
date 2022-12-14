import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addExpenseAction,
  fetchCurrenciesAction,
  fetchExchangeRatesAction,
  submitEditedExpenseAction,
  saveExpesesToStoreAction,
  getExpenseToEditInfoAction,
} from '../redux/actions/walletActions';
import 'bulma/css/bulma-rtl.css';
import '../styles/App.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      id: 0,
      hasRenderedEditInfo: false,
      hasFinishedEditing: false,
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
    this.getExpensesFromLocalstore();
  }

  componentDidUpdate() {
    const { hasRenderedEditInfo, hasFinishedEditing } = this.state;
    const { editor } = this.props;
    if (editor && !hasRenderedEditInfo) {
      this.getExpenseToEditInfo();
    }
    if (editor && hasFinishedEditing && hasRenderedEditInfo) {
      this.setState({ hasFinishedEditing: false, hasRenderedEditInfo: false });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const INITIAL_STATE = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    const { editor } = this.props;
    if (editor) {
      return this.handleEditSubmit(INITIAL_STATE);
    } 
    return this.handleAddSubmit(INITIAL_STATE);
  }

  handleEditSubmit = (INITIAL_STATE) => {
    const { expenses, idToEdit, submitEditedExpense } = this.props;
    const indexExpenseToEdit = expenses.map((expense) => expense.id).indexOf(idToEdit);
    const { exchangeRates, id } = expenses[indexExpenseToEdit];
    const editedExpense = { ...this.state, id, exchangeRates };
    expenses[indexExpenseToEdit] = editedExpense;
    const newExpenses = [...expenses];
    submitEditedExpense(newExpenses); 
    this.setState({
      ...INITIAL_STATE,
      hasRenderedEditInfo: false,
      hasFinishedEditing: true,
    });
  }

  handleAddSubmit = async (INITIAL_STATE) => {
    const { addExpense, fetchExchangeRates } = this.props;
    const data = await fetchExchangeRates();
    addExpense({ ...this.state, exchangeRates: data });
    this.setState((state) => ({
      id: state.id + 1,
      ...INITIAL_STATE,
    }));
  }

  getExpensesFromLocalstore = () => {
    const { saveExpesesToStore } = this.props;
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (expenses.length > 0) {
      const lastSavedID = expenses[expenses.length - 1].id;
      this.setState({
        id: lastSavedID + 1,
      });
    }
    return saveExpesesToStore(expenses);
  }

  getExpenseToEditInfo = () => {
    const INITIAL_STATE = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      hasRenderedEditInfo: true,
    };
    const { expensetoEditInfo } = this.props;
    const { hasFinishedEditing } = this.state;
    hasFinishedEditing ? this.setState(INITIAL_STATE) : this.setState({
      value: expensetoEditInfo.value,
      description: expensetoEditInfo.description,
      currency: expensetoEditInfo.currency,
      method: expensetoEditInfo.method,
      tag: expensetoEditInfo.tag,
      hasRenderedEditInfo: true,
      hasFinishedEditing: false,
    });
  };

  togleButtonStyle = () => {
    const { value, description } = this.state;
    const { editor } = this.props;
    let buttonStyles = "button medium centered walletFormButton";
    if (value && description && !editor) {
      buttonStyles += ' is-success';
    };
    if (value && description && editor) {
      buttonStyles += ' is-warning';
    };
    return buttonStyles;
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section className="section">
        <form className="form walletForm">
          <div className="level walletFormLevel">
            <div className="field level-item">
              <label htmlFor="value" className="label">
                Valor:
                <div className="control">
                  <input
                    type="number"
                    name="value"
                    id="value"
                    onChange={ this.handleChange }
                    value={ value }
                    className="input"
                    data-testid="value-input"
                  />
                </div>
              </label>
            </div>
            <div className="field level-item">
              <label htmlFor="description" className="label">
                Descrição:
                <div className="control">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    onChange={ this.handleChange }
                    value={ description }
                    className="input"
                    data-testid="description-input"
                  />
                </div>
              </label>
            </div>
            <div className="field level-item">
              <label htmlFor="currency" className="label">
                Moeda:
                <br />
                <div className="control select">
                  <select
                    name="currency"
                    id="currency"
                    onChange={ this.handleChange }
                    value={ currency }
                    data-testid="currency-input"
                  >
                    { currencies
                      .map((currencie, index) => (
                        <option key={ index } value={ currencie }>
                          { currencie }
                        </option>
                      )) }
                  </select>
                </div>
              </label>
            </div>
            <div className="field level-item">
              <label htmlFor="method" className="label">
                Forma de pagamento:
                <br />
                <div className="control select">
                  <select
                    name="method"
                    id="method"
                    onChange={ this.handleChange }
                    value={ method }
                    data-testid="method-input"
                  >
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de crédito">Cartão de crédito</option>
                    <option value="Cartão de débito">Cartão de débito</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="field level-item">
              <label htmlFor="tag" className="label">
                Categoria:
                <br />
                <div className="control select">
                  <select
                    name="tag"
                    id="tag"
                    onChange={ this.handleChange }
                    value={ tag }
                    data-testid="tag-input"
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Saúde">Saúde</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="field level-item">
              <label htmlFor="" className="label">
                <br />
                <div className="control">
                  <button
                    type="submit"
                    className={ this.togleButtonStyle() }
                    onClick={ (e) => this.handleSubmit(e) }
                    disabled={ !(value && description) }
                  >
                    { editor ? 'Editar despesa' : 'Adicionar despesa' }
                  </button>
                </div>
              </label>
            </div>
          </div>
        </form>
      </section>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(addExpenseAction(payload)),
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  fetchExchangeRates: (payload) => dispatch(fetchExchangeRatesAction(payload)),
  submitEditedExpense: (payload) => dispatch(submitEditedExpenseAction(payload)),
  saveExpesesToStore: (payload) =>  dispatch(saveExpesesToStoreAction(payload)),
  getExpenseToEditInfo: (payload) =>  dispatch(getExpenseToEditInfoAction(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expensetoEditInfo: state.wallet.expensetoEditInfo,
});

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchExchangeRates: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    exchangeRates: PropTypes.shape({}),
    id: PropTypes.number.isRequired,
  })).isRequired,
  submitEditedExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
