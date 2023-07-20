import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import * as actions from '../redux/actions';

describe('Testando toda a aplicação', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });
  test('Renderiza e testa os componentes da página de login', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    await userEvent.type(emailInput, 'teste@teste.com');
    await userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('teste@teste.com');
    expect(passwordInput).toHaveValue('123456');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);
    expect(global.fetch).toHaveBeenCalled();
  });
  test('Renderiza e testa os componentes da página de carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);

    await userEvent.type(emailInput, 'teste@trybe.com');
    await userEvent.type(passwordInput, '525456');

    await userEvent.click(button);
    expect(global.fetch).toHaveBeenCalled();
    const expenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(screen.getByText(/e-mail:/i)).toBeInTheDocument();
    expect(screen.getByText(/total:/i)).toBeInTheDocument();
    expect(screen.getByText(/câmbio:/i)).toBeInTheDocument();
    expect(screen.getByText(/valor:/i)).toBeInTheDocument();
    expect(screen.getByText(/descrição:/i)).toBeInTheDocument();
    expect(screen.getByText(/moeda:/i)).toBeInTheDocument();
    expect(screen.getByText(/método de pagamento:/i)).toBeInTheDocument();
    expect(screen.getByText(/categoria:/i)).toBeInTheDocument();
    expect(expenseButton).toBeInTheDocument();

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const description = screen.getByRole('textbox', { name: /descrição:/i });
    const currencies = screen.getByRole('combobox', { name: /moeda:/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const tag = screen.getByRole('combobox', { name: /categoria:/i });
    const totalValue = screen.getByTestId('total-field');

    expect(valueInput).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currencies).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

    await userEvent.selectOptions(currencies, 'USD');
    expect(currencies).toHaveValue('USD');
    await userEvent.selectOptions(currencies, 'EUR');
    expect(currencies).toHaveValue('EUR');

    await userEvent.selectOptions(method, 'Cartão de débito');
    expect(method).toHaveValue('Cartão de débito');

    await userEvent.selectOptions(tag, 'Lazer');
    expect(tag).toHaveValue('Lazer');

    await userEvent.type(valueInput, '50');
    expect(valueInput).toHaveValue(50);

    await userEvent.type(description, 'Vamoooo');
    expect(description).toHaveValue('Vamoooo');

    await userEvent.click(expenseButton);
    expect(totalValue).toBeInTheDocument();

    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Tag')).toBeInTheDocument();
    expect(screen.getByText('Método de pagamento')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Moeda')).toBeInTheDocument();
    expect(screen.getByText('Câmbio utilizado')).toBeInTheDocument();
    expect(screen.getByText('Valor convertido')).toBeInTheDocument();
    expect(screen.getByText('Moeda de conversão')).toBeInTheDocument();
    expect(screen.getByText('Editar/Excluir')).toBeInTheDocument();

    const tableDescription = screen.getByRole('columnheader', { name: /descrição/i });
    const editButton = screen.getByRole('button', { name: /editar/i });
    const removeButton = screen.getByRole('button', { name: /excluir/i });

    expect(tableDescription).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    expect(screen.getByRole('cell', { name: /vamoooo/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /lazer/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /cartão de débito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /50/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /euro\/real brasileiro/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /5\.13/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /256\.34/i })).toBeInTheDocument();

    const deleteButton = screen.getByTestId('delete-btn');
    await userEvent.click(deleteButton);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
