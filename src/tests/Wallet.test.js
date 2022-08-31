import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('teste unitário página da carteira', () => {
  const I_S = {
    wallet: {
      currencies: [],
      rates: [],
      expenses: [{
        value: '10',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'a',
        id: -1,
        exchangeRates: { ...mockData },
      }],
      editor: false,
      idToEdit: -1,
      error: {
        currencies: '',
        rates: '',
      },
    },
  };

  const URL = 'https://economia.awesomeapi.com.br/json/all';

  afterEach(() => {
    fetchMock.reset();
  });

  it('o botao de adicionar esta desabilitado caso nao tenha sido preenchido nada', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { ...mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(submitButton);

    const excluirButton = screen.queryAllByRole('button', { name: /excluir/i });

    expect(excluirButton.length).toBe(1);
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente valor', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { ...mockData });

    history.push('/carteira');

    const valueInputField = screen.getByLabelText(/valor:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '11');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const expeses = screen.queryAllByText('11.00');

    expect(expeses.length).toBe(0);
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente descrição', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { ...mockData });

    history.push('/carteira');

    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(descriptionInputField, 'b');
    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.calls().length).toBe(1));

    expect(screen.queryAllByText('b').length).toBe(0);
  });

  it('a despesa é adicionada ao store se preenchido corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { ...mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    fetchMock.restore();

    fetchMock.getOnce(URL, { ...mockData });

    const valueInputField = screen.getByLabelText(/valor:/i);
    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');

    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.calls().length).toBe(1));

    const expese1 = screen.getAllByText('a');
    const expese2 = screen.getAllByText('10.00');

    expect(expese2.length).toBe(1);
    expect(expese1.length).toBe(1);
  });
});

describe('teste unitário do componente Header', () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  afterEach(() => {
    fetchMock.reset();
  });

  it('tem o valor 0 ao carregar a página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const valueField = screen.getByRole('heading', { level: 3, name: '0.00' });

    expect(valueField).toBeInTheDocument();
  });

  it('tem o valor 10 ao adicionar uma despesa de 10 e 20 se adicionar duas despesas de 10', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    fetchMock.getOnce(URL, { mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    fetchMock.restore();

    fetchMock.getOnce(URL, { ...mockData });

    const valueInputField = screen.getByLabelText(/Valor:/i);
    const descriptionInputField = screen.getByLabelText(/descrição:/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');

    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    fetchMock.restore();

    expect(screen.getByRole('heading', { level: 3, name: '47.53' })).toBeInTheDocument();

    fetchMock.getOnce(URL, { ...mockData });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'b');

    userEvent.click(submitButton);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    expect(screen.getByRole('heading', { level: 3, name: '95.06' })).toBeInTheDocument();
  });
});
