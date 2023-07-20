import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export type SaveEmail = {
  type: typeof SAVE_EMAIL;
  payload: string;
};

export type AddExpense = {
  type: typeof ADD_EXPENSE;
  payload: Expense;
};

export type RemoveExpense = {
  type: typeof REMOVE_EXPENSE;
  payload: string;
};

export type SetCurrencies = {
  type: typeof SET_CURRENCIES;
  payload: Expense;
};

export type WalletType = {
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
};

export type Expense = {
  id: string;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: {
    [name: string]: {
      code: string;
      name: string;
      ask: string;
    };
  };
};

export type Currency = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;

export type RootState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    editor: boolean,
    expenses: Expense[],
    idToEdit: number,
  },
};
