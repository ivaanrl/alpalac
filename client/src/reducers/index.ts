import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { user } from './auth';
import { shoppingCart, shoppingCartArrayInterface } from './shoppingCart';

export interface StoreState {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    street: string;
    number: string;
    role: string;
    phoneNumber: string;
  };
  form: FormStateMap;
  shoppingCart: { shoppingCart: shoppingCartArrayInterface };
}

export const rootReducer = combineReducers<StoreState>({
  user,
  form: formReducer,
  shoppingCart: shoppingCart,
});
