import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    const expensesSum = expenses
      .map((expense) => parseFloat(parseFloat(expense
        .value) * expense.exchangeRates[expense.currency].ask))
      .reduce((curr, acc) => acc + curr, 0)
      .toFixed(2) || 0.00;
    return (
      <section>
        <img src="" alt="Logo" />
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{ expensesSum }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
