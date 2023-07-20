import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../types';
import { removeExpense } from '../redux/actions';

function Table() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const dispatch: Dispatch = useDispatch();

  const handleRemoveExpense = (id: string) => {
    dispatch(removeExpense(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>
              {expense.value}
              .00
            </td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(
                Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)
              ).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
              >
                Editar
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => handleRemoveExpense(expense.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default Table;
