import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses = 0 } = this.props;
    return (
      <section>
        <img src="" alt="Logo" />
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ expenses }</span>
        <span data-testid="header-currency-field">BRL</span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape([{}]).isRequired,
};

export default connect(mapStateToProps)(Header);
