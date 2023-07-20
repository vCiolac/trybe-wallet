import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const RootReducer = combineReducers({ user, wallet });

export default RootReducer;
