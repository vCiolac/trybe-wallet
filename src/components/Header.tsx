import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);

  const TotalExpense = () => {
    return 0;
  };
  const total = TotalExpense();

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
        {total}
      </div>
      <div data-testid="header-currency-field">Câmbio: BRL</div>
    </div>
  );
}

export default Header;
