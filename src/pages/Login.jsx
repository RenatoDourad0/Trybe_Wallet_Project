import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../redux/actions/userActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validData: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validadeInfo());
  };

  validadeInfo = () => {
    const { email, password } = this.state;
    // const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i;
    const passwordLength = 6;
    if (email.includes('@') && password.length >= passwordLength) {
      this.setState({
        validData: true,
      });
    }
  };

  render() {
    const { history, login } = this.props;
    const { email, validData } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              onChange={ (e) => this.handleChange(e) }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              min="6"
              onChange={ (e) => this.handleChange(e) }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ !validData }
            onClick={ () => {
              login(email);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
