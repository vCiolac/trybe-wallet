import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  console.log(expenses);

  const total = expenses.reduce((acc, curr) => {
    if (curr.exchangeRates && Object.keys(curr.exchangeRates).length > 0) {
      const expValue = Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask);
      return acc + expValue;
    }
    return acc;
  }, 0);

  return (
    <div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <span data-testid="email-field">{userEmail}</span>
      </div>
      <div>
        <label htmlFor="total">Total:</label>
        <span data-testid="total-field">{total.toFixed(2)}</span>
      </div>
      <div>
        <label htmlFor="header-currency">Câmbio: </label>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    </div>
  );
}

export default Header;
