import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const expensesSum = expenses
      .map((expense) => parseFloat(expense
        .value * expense.exchangeRates[expense.currency].ask))
      .reduce((curr, acc) => acc + curr, 0)
      .toFixed(2);
    return (
      <section>
        <img src="" alt="Logo" />
        <span data-testid="email-field">{ email }</span>
        {' '}
        <span data-testid="total-field">{ expensesSum }</span>
        {' '}
        <span data-testid="header-currency-field">BRL</span>
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
