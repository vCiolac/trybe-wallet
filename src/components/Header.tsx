import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../types';

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  console.log(expenses);

  const total = expenses.reduce((acc, expense) => {
    const value = Number(expense.value) * Number(
      expense.exchangeRates[expense.currency].ask,
    );
    return acc + value;
  }, 0);

  return (
    <div>
      <div data-testid="email-field">
        E-mail:
        {' '}
        {userEmail}
      </div>
      <div data-testid="total-field">
        Total:
        {' '}
        {total.toFixed(2)}
      </div>
      <div data-testid="header-currency-field">Câmbio: BRL</div>
    </div>
  );
}

export default Header;
