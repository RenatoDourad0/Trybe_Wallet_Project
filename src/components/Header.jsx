import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
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
      <section className="section">
        <div className="level">

          <img src="" alt="Logo" className="logo level-left" />

          <div className="level-item totalExpenses">
            <h3
              data-testid="total-field"
              className="level-item"
            >
              { this.calculateExpensesTotal() }
            </h3>
            &#32;
            <h3
              data-testid="header-currency-field"
              className="level-item"
            > 
              BRL
            </h3>
          </div>

          <div className="level-right userInfo">
            <span className="icon userIcon">
              <FontAwesomeIcon icon={ faUserCircle } className="userIcon"/>
            </span>
            &#32;
            <h3
              data-testid="email-field"
              className="username"
            >
              { email.split('@')[0] }
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
