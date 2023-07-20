import {
  SET_CURRENCIES,
  AddExpense,
  Expense,
  SAVE_EMAIL,
  SaveEmail,
  ADD_EXPENSE,
  SetCurrencies,
  Dispatch,
  RemoveExpense,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  EditExpense,
} from '../../types';

export const saveEmail = (email: string): SaveEmail => {
  return {
    type: SAVE_EMAIL,
    payload: email,
  };
};

export const setCurrencies = (currencies?: any): SetCurrencies => {
  return {
    type: SET_CURRENCIES,
    payload: currencies,
  };
};

export const addExpense = (expense: Expense): AddExpense => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

export const removeExpense = (id: string): RemoveExpense => {
  return {
    type: REMOVE_EXPENSE,
    payload: id,
  };
};

// export const editExpense = (expense: Expense): EditExpense => {
//   return {
//     type: EDIT_EXPENSE,
//     payload: expense,
//   };
// };

export const fetchData = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  return data;
};

export const filteredFetch = () => {
  return async (dispatch: Dispatch) => {
    const data = await fetchData();
    const filteredData = Object.keys(data)
      .filter((currency) => currency !== 'USDT');
    dispatch(setCurrencies(filteredData));
  };
};

export async function filteredCurrencis() {
  const data = await fetchData();
  const filteredData = Object.values(data)
    .filter((currency: any) => currency.codein !== 'BRLT')
    .map((currency: any) => ({
      [currency.code]: {
        code: currency.code,
        name: currency.name,
        ask: currency.ask,
      },
    }));
  return filteredData;
}
