import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';

describe('teste unitário página da carteira', () => {
  it('o botao de adicionar esta desabilitado caso nao tenha sido preenchido nada', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renat@dourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(enterButton);

    const valueInputField = screen.getByLabelText(/valor:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(submitButton);

    expect(valueInputField).toHaveTextContent('');
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente valor', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@douradoo.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(enterButton);

    const valueInputField = screen.getByLabelText(/valor:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.click(submitButton);

    expect(valueInputField).toHaveTextContent('10');
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente descrição', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@dourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(enterButton);

    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    expect(descriptionInputField).toHaveTextContent('a');
  });

  it('a despesa é adicionada ao store se preenchido corretamente', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@dourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(enterButton);

    const valueInputField = screen.getByLabelText(/valor:/i);
    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    const expectedState = {
      id: 0,
      value: '10',
      description: 'a',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    const state = store.getState();
    console.log(state);

    expect(state.wallet.expenses.length).toBe(1);
    expect(state.wallet.expenses[0]).toEqual(expectedState);
  });
});

describe('teste unitário do componente Header', () => {
  it('tem o valor 0 ao carregar a página', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@cdourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(enterButton);

    const valueField = screen.getByRole('heading', { level: 3, name: '0.00' });

    expect(valueField).toBeInTheDocument();
  });

  it('tem o valor 10 ao adicionar uma despesa de 10 e 20 se adicionar duas despesas de 10', () => {
    renderWithRouterAndRedux(<App />);

    const emailInputField = screen.getByLabelText(/email:/i);
    const passwordInputField = screen.getByLabelText(/senha:/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInputField, 'renato@cdourado.com');
    userEvent.type(passwordInputField, '1234567');
    userEvent.click(enterButton);

    const valueInputField = screen.getByLabelText(/Valor:/i);
    const descriptionInputField = screen.getByLabelText(/descrição:/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    expect(screen.getByRole('heading', { level: 3, name: '51.09' })).toBeInTheDocument();

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'b');
    userEvent.click(submitButton);

    expect(screen.getByRole('heading', { level: 3, name: '20.00' })).toBeInTheDocument();
  });
});
