import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';

describe('teste unitário página da carteira', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: jest.fn().mockReturnValue({
          type: 'GET_CURRENCIES',
          mockData,
        })
      }),
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('o botao de adicionar esta desabilitado caso nao tenha sido preenchido nada', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/carteira');

    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(submitButton);

    const excluirButton = screen.queryByRole('button', { name: /excluir/i });

    expect(excluirButton).not.toBeInTheDocument();
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente valor', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/carteira');

    const valueInputField = screen.getByLabelText(/valor:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.click(submitButton);

    const expeses = screen.queryAllByText('10.00');

    expect(expeses.length).toBe(0);
  });

  it('o botao de adicionar esta desabilitado caso preenchido somente descrição', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/carteira');

    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    expect(screen.queryAllByText('a').length).toBe(0);
  });

  it('a despesa é adicionada ao store se preenchido corretamente', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    history.push('/carteira');

    const valueInputField = screen.getByLabelText(/valor:/i);
    const descriptionInputField = screen.getByLabelText(/Descrição:/i);
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    const expese1 = screen.queryAllByText('a');
    const expese2 = screen.queryAllByText('10.00');

    expect(expese1.length).toBe(1);
    expect(expese2.length).toBe(1);
  });
});

describe('teste unitário do componente Header', () => {
  it('tem o valor 0 ao carregar a página', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/carteira');

    const valueField = screen.getByRole('heading', { level: 3, name: '0.00' });

    expect(valueField).toBeInTheDocument();
  });

  it('tem o valor 10 ao adicionar uma despesa de 10 e 20 se adicionar duas despesas de 10', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/carteira');

    const valueInputField = screen.getByLabelText(/Valor:/i);
    const descriptionInputField = screen.getByLabelText(/descrição:/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'a');
    userEvent.click(submitButton);

    expect(screen.getByRole('heading', { level: 3, name: '47.53' })).toBeInTheDocument();

    userEvent.type(valueInputField, '10');
    userEvent.type(descriptionInputField, 'b');
    userEvent.click(submitButton);

    expect(screen.getByRole('heading', { level: 3, name: '95.06' })).toBeInTheDocument();
  });
});
