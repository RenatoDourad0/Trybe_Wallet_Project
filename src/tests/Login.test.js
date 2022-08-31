import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('teste unitário página de login', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const URL = 'https://economia.awesomeapi.com.br/json/all';

  it('o botao de entrar esta desabilitado caso nao tenha sido preenchido nada', async () => {
    renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { ...mockData });

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).not.toBeTruthy());

    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
  });

  it('o botao de entrar esta desabilitado caso o email estaja fora do padrao', async () => {
    renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { ...mockData });

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).not.toBeTruthy());

    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
  });

  it('o botao de entrar esta desabilitado caso a senha estaja fora do padrao', async () => {
    renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { ...mockData });

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@doura.com');
    userEvent.type(passwordInputField, '123');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).not.toBeTruthy());

    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
  });

  it('o usuário e redirecionado em caso de sucesso de login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { mockData });

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@cdourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const valueInputField = screen.getByLabelText(/valor:/i);

    expect(emailInputField).not.toBeInTheDocument();
    expect(passwordInputField).not.toBeInTheDocument();
    expect(valueInputField).toBeInTheDocument();
    expect(history.location.pathname).toBe('/carteira');
  });

  it('O email do usuário é salvo do store', async () => {
    const { store } = renderWithRouterAndRedux(<App />);

    fetchMock.getOnce('https://economia.awesomeapi.com.br/json/all', { mockData });

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@dourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const state = store.getState();
    expect(state.user.email).toBe('renato@dourado.com');
  });
});
