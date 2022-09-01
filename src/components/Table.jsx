import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction, editExpenseAction } from '../redux/actions/walletActions';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bulma/css/bulma-rtl.css';
import '../styles/App.css';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      expenseOnfocusId: -1,
    }
  }

  changeMenuVisibility = (id = -1) => {
    this.setState({
      expenseOnfocusId: id, 
    });
  }

  render() {
    const { expenses, removeExpense, editExpense } = this.props;
    const { expenseOnfocusId } = this.state;
    return (
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody className="tbody">
          { expenses.length > 0
            && expenses.map((expense) => (
            <tr key={ expense.id } className="tr tableRow">
              <td className="th">{ expense.description }</td>
              <td className="td">{ expense.tag }</td>
              <td className="td">{ expense.method }</td>
              <td className="td">{ parseFloat(expense.value).toFixed(2) }</td>
              <td className="td">{ expense.exchangeRates[expense.currency].name }</td>
              <td className="td">
                {
                  parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td className="td">
                {
                  parseFloat(expense.value
                  * expense.exchangeRates[expense.currency].ask).toFixed(2)
                }
              </td>
              <td className="td">Real</td>
              <td className="td tableEditMenu">
                { expenseOnfocusId !== expense.id
                  ? (
                    <span className="icon">
                          <FontAwesomeIcon
                            icon={ faBars }
                            onMouseEnter={ () => this.changeMenuVisibility(expense.id) }
                          />
                        </span>)
                  : (
                    <div onMouseLeave={ () => this.changeMenuVisibility() }>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        className="button tableEditionButton is-danger"
                        onClick={ () => removeExpense(expense.id) }
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        className="button tableEditionButton is-warning"
                        onClick={ () => editExpense(expense.id) }
                      >
                        Editar
                      </button>
                    </div>)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (payload) => dispatch(removeExpenseAction(payload)),
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
