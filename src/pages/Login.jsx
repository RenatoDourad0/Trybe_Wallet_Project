import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../redux/actions/userActions';
import 'bulma/css/bulma-rtl.css';
import '../styles/App.css';

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
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const passwordLength = 6;
    if (email.match(emailRegex) && password.length >= passwordLength) {
      this.setState({
        validData: true,
      });
    } else {
      this.setState({
        validData: false,
      });
    }
  };

  render() {
    const { history, login } = this.props;
    const { email, validData } = this.state;
    return (
      <section className="section fullHeight">
        <form className="container">
          <div className="loginForm">
            <label htmlFor="email" className="label">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                onChange={ (e) => this.handleChange(e) }
                className="input"
                data-testid="email-input"
              />
            </label>
            <label htmlFor="password" className="label">
              Senha:
              <input
                type="password"
                id="password"
                name="password"
                min="6"
                onChange={ (e) => this.handleChange(e) }
                className="input"
                data-testid="password-input"
              />
            </label>
            <button
              type="submit"
              disabled={ !validData }
              onClick={ (e) => {
                e.preventDefault();
                login(email);
                history.push('/carteira');
              } }
              className="button"
            >
              Entrar
            </button>
          </div>
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
