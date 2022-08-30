import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';

describe('teste unitário página de login', () => {
  it('o botao de entrar esta desabilitado caso nao tenha sido preenchido nada', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.click(submitButton);

    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
  });

  it('o botao de entrar esta desabilitado caso o email estaja fora do padrao', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato');
    userEvent.click(submitButton);

    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
  });

  it('o botao de entrar esta desabilitado caso a senha estaja fora do padrao', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@doura.com');
    userEvent.type(passwordInputField, '123');
    userEvent.click(submitButton);

    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
  });

  it('o usuário e redirecionado em caso de sucesso de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@cdourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(submitButton);

    const valueInputField = screen.getByLabelText(/valor:/i);

    expect(emailInputField).not.toBeInTheDocument();
    expect(passwordInputField).not.toBeInTheDocument();
    expect(valueInputField).toBeInTheDocument();
    expect(history.location.pathname).toBe('/carteira');
  });

  it('O email do usuário é salvo do store', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@dourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(submitButton);

    const state = store.getState();
    expect(state.user.email).toBe('renato@dourado.com');
  });
});
