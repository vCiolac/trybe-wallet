import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, RootState, WalletType } from '../types';
import { addExpense, fetchData, filteredFetch } from '../redux/actions';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  // const [totalValue, setTotalValue] = useState(0);
  const [input, setInput] = useState<WalletType>({
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  });
  const [select, setSelect] = useState<WalletType>({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  useEffect(() => {
    const fetch = async () => {
      dispatch(filteredFetch());
    };
    fetch();
  }, []);

  const currencies = useSelector((state: RootState) => state.wallet.currencies);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelect({
      ...select,
      [name]: value,
    });
  };

  const handleExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await fetchData();
    const newExpense = {
      ...input,
      id: Number(input.value),
      currency: select.currency,
      method: select.method,
      tag: select.tag,
      exchangeRates: data,
      value: Number(input.value),
      description: input.description,
    };
    dispatch(addExpense([newExpense]));
    // setTotalValue(totalValue + 1);
    setInput({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
    setSelect({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  return (
    <div>
      <form onSubmit={ handleExpense }>
        <div>
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            id="value"
            name="value"
            data-testid="value-input"
            value={ input.value }
            onChange={ handleInput }
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            value={ input.description }
            onChange={ handleInput }
          />
        </div>
        <div>
          <label htmlFor="currency">Moeda:</label>
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ select.currency }
            onChange={ handleSelect }
          >
            { currencies.map((currency, index) => (
              <option
                key={ `${currency} ${index}` }
                value={ `${currency}` }
              >
                { currency }
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="method">Método de Pagamento:</label>
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ select.method }
            onChange={ handleSelect }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>
        <div>
          <label htmlFor="tag">Categoria:</label>
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={ select.tag }
            onChange={ handleSelect }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button type="submit">Adicionar Despesa</button>
      </form>
    </div>
  );
}

export default WalletForm;
