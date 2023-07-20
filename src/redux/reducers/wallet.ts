import { AnyAction } from 'redux';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_CURRENCIES } from '../../types';

const initialState = {
  currencies: [],
  editor: false,
  expenses: [],
  idToEdit: 0,
};

const wallet = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_CURRENCIES:
      return {
        ...state,
        currencies: [...action.payload],
      };
    case ADD_EXPENSE:
      return {
        ...state,
        idToEdit: state.idToEdit + 1,
        expenses: [...state.expenses,
          { ...action.payload,
            id: state.idToEdit,
            exchangeRates: action.payload.exchangeRates }],
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense: any) => expense.id !== action.payload),
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses
          .map((expense: any) => (expense
            .id === action.payload.id ? action.payload : expense)),
      };
    default:
      return state;
  }
};

export default wallet;
