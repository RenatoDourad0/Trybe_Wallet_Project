import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faWallet, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bulma/css/bulma-rtl.css';
import '../styles/App.css';

class Header extends Component {
  calculateExpensesTotal = () => {
    const { expenses } = this.props;
    return expenses
      .map((expense) => parseFloat(parseFloat(expense
        .value) * expense.exchangeRates[expense.currency].ask))
      .reduce((curr, acc) => acc + curr, 0)
      .toFixed(2) || 0.00;
  }

  render() {
    const { email } = this.props;
    return (
      <section className="section header">
        <div className="headerContainer">
          <div className="walletLogo">
          <h3 className="textHeaderLogo">TrybeWallet</h3>
          <FontAwesomeIcon icon={faCoins} className="coinsHeaderLogo"/>
          <FontAwesomeIcon icon={faWallet} className="walletHeaderLogo"/>
          </div>
          <div className="userInfo">
            <h3
              data-testid="email-field"
              className="username"
            >
              { email.split('@')[0] }
            </h3>
            <span className="icon userIcon">
              <FontAwesomeIcon icon={ faUserCircle } className="userIcon"/>
            </span>
          </div>

          <div className="">
            <h3
              data-testid="total-field"
              className=" totalExpenses"
            >
              { "Despesa total: " + this.calculateExpensesTotal() + " BRL" }
            </h3>
          </div>

        </div>
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
