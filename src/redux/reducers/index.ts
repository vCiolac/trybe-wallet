import { combineReducers } from 'redux';
import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// reducers/index.ts

const RootReducer = combineReducers({ user });

export default RootReducer;
