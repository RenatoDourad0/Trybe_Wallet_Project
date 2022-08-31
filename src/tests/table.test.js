import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('teste unitário tabela de despesas', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const URL = 'https://economia.awesomeapi.com.br/json/all';

  it('se é possivel editar', async () => {
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
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { ...mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    fetchMock.reset();

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /editar despesa/i });
    const valueInput = screen.getByLabelText(/valor:/i);
    const descriptionInput = screen.getByLabelText(/descrição:/i);

    userEvent.click(editButton);

    const editButton2 = screen.getAllByRole('button', { name: /editar despesa/i })[0];

    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'b');

    userEvent.click(editButton2);

    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('20.00')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '95.06' })).toBeInTheDocument();
  });

  it('se é possivel remover', async () => {
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
    const { history } = renderWithRouterAndRedux(<App />, { initialState: I_S });

    fetchMock.getOnce(URL, { ...mockData });

    history.push('/carteira');

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    fetchMock.reset();

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /excluir/i });

    userEvent.click(removeButton);

    expect(screen.queryByText('a')).not.toBeInTheDocument();
    expect(screen.queryByText('10.00')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '0.00' })).toBeInTheDocument();
  });
});
