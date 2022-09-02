import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../redux/actions/userActions';
import { faEnvelope, faKeyboard, faCircleCheck, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faWallet, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bulma/css/bulma-rtl.css';
import '../styles/App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
      showPassword: false,
    };
  }

  handleChange = ({ target: { name, value, type }, target }) => {
    const data = type === 'checkbox' ? target.checked : value
    this.setState({
      [name]: data,
    }, () => this.validadeInfo());
  };

  validadeInfo = () => {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const passwordLength = 6;
    if (email.match(emailRegex)) { this.setState({ validEmail: true }) };
    if (password.length >= passwordLength) { this.setState({ validPassword: true }) };
    if (!email.match(emailRegex)) { this.setState({ validEmail: false }) };
    if (password.length < passwordLength) { this.setState({ validPassword: false }) };
  }

  renderButton = () => {
    const { email, validEmail, validPassword } = this.state;
    const { login, history } = this.props;
    let buttonStyles = "button medium centered";
    if (validEmail && validPassword) {
      buttonStyles += " is-success"
    };
    return (
      <div className="field">
        <p className="control">
          <button
          type="submit"
          disabled={ !validPassword || !validEmail }
          onClick={ (e) => {
            e.preventDefault();
            login(email);
            history.push('/carteira');
          } }
          className={ buttonStyles }
          >
            Entrar
          </button>
        </p>
      </div>
    )
  }

  renderEmailInput = () => {
    const { validEmail, email } = this.state; 
    return (
    <div className="field">
      <label htmlFor="email" className="label">
        Email:
        <div className="control has-icons-left has-icons-right">
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={ faEnvelope } color="black" />
          </span>
          { validEmail
          ? <span className="icon is-small is-right">
              <FontAwesomeIcon icon={ faCircleCheck } color="green" />
            </span>
          :  email.length > 0 && 
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon={ faCircleXmark } color="red" />
              </span>
          }
          <input
            type="email"
            id="email"
            name="email"
            onChange={ (e) => this.handleChange(e) }
            value={ email }
            className="input loginInput"
            data-testid="email-input"
          />
        </div>
      </label>
    </div>
    );
  }

  renderPasswordInput = () => {
    const { password, validPassword, showPassword } = this.state;
    return (
      <div className="field passwordContainer">
        <label htmlFor="password" className="label">
          Senha:
          <div className="control has-icons-left has-icons-right">
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={ faKeyboard } color="black"/>
            </span>
            <div className="icon is-small is-right">
              { validPassword
              ? <span className="icon is-small is-right loginValidationIcon">
                  <FontAwesomeIcon icon={ faCircleCheck } color="green" />
                </span>
              : password.length > 0 &&
                  <span className="icon is-small is-right loginValidationIcon">
                    <FontAwesomeIcon icon={ faCircleXmark } color="red" />
                  </span>
              }
            </div>
            <input
              type={ showPassword ? "text" : "password" }
              id="password"
              name="password"
              onChange={ (e) => this.handleChange(e) }
              value={ password }
              className="input loginInput"
              data-testid="password-input"
            />
          </div>
        </label>
        <label htmlFor="showPassword" className="showPasswordLabel">
          { !showPassword
          ? (
            <span className="icon is-small is-right">
              <FontAwesomeIcon icon={ faEye } />
            </span>
            )
          : (
            <span className="icon is-small is-right">
              <FontAwesomeIcon icon={ faEyeSlash } />
            </span>
            )
          }
          <input
            type="checkbox"
            className="loginValidationInput"
            name="showPassword"
            id="showPassword"
            value={ showPassword }
            onClick={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  render() {
    return (
      <section className="section fullHeight">
        <form className="container">
          <div className="loginForm">
            <div className="loginlogo">
              <h3 className="textLoginLogo">TrybeWallet</h3>
              <FontAwesomeIcon icon={faCoins} className="coinsLoginLogo"/>
              <FontAwesomeIcon icon={faWallet} className="walletLoginLogo"/>
            </div>
              { this.renderEmailInput() }
              { this.renderPasswordInput() }
              { this.renderButton() }
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
