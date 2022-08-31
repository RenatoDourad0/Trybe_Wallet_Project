import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';

describe('teste unitário página da carteira', () => {
  const I_S = {
    currencies: [],
    rates: [],
    expenses: [{
      value: '10',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'a',
      id: 0,
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: -1,
    error: {
      currencies: '',
      rates: '',
    },
  };

  const URL = 'https://economia.awesomeapi.com.br/json/all';

  afterEach(() => {
    fetchMock.reset();
  });

  it('o botao de adicionar esta desabilitado caso nao tenha sido preenchido nada', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { mockData });

    history.push('/carteira');

    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const excluirButton = screen.queryByRole('button', { name: /excluir/i });

    expect(excluirButton).not.toBeInTheDocument();
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente valor', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { mockData });

    history.push('/carteira');

    const valueInputField = screen.getByLabelText(/valor:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const expeses = screen.queryAllByText('10.00');

    expect(expeses.length).toBe(0);
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente descrição', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).not.toBeTruthy());

    expect(screen.queryAllByText('a').length).toBe(0);
  });

  it('a despesa é adicionada ao store se preenchido corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.get(URL, { mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const valueInputField = screen.getByLabelText(/valor:/i);
    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');

    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const expese1 = screen.findAllByText('a');
    const expese2 = screen.findAllByText('10.00');

    expect(expese1.length).toBe(1);
    expect(expese2.length).toBe(1);
  });
});

describe('teste unitário do componente Header', () => {
  const I_S = {
    currencies: [],
    rates: [],
    expenses: [{
      value: '10',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'a',
      id: 0,
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: -1,
    error: {
      currencies: '',
      rates: '',
    },
  };

  const URL = 'https://economia.awesomeapi.com.br/json/all';

  afterEach(() => {
    fetchMock.reset();
  });

  it('tem o valor 0 ao carregar a página', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const valueField = screen.getByRole('heading', { level: 3, name: '0.00' });

    expect(valueField).toBeInTheDocument();
  });

  it('tem o valor 10 ao adicionar uma despesa de 10 e 20 se adicionar duas despesas de 10', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.get(URL, { mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const valueInputField = screen.getByLabelText(/Valor:/i);
    const descriptionInputField = screen.getByLabelText(/descrição:/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');

    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    expect(screen.getByRole('heading', { level: 3, name: '47.53' })).toBeInTheDocument();

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'b');

    userEvent.click(submitButton);

    expect(screen.getByRole('heading', { level: 3, name: '95.06' })).toBeInTheDocument();
  });
});
