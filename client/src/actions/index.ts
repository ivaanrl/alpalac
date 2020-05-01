import { login, logout, addUserInfo } from './auth';
import {
  addToShoppingCart,
  removeFromShoppingCart,
  clearShoppingCart,
} from './shoppingCart';

const allActions = {
  login,
  logout,
  addToShoppingCart,
  removeFromShoppingCart,
  clearShoppingCart,
  addUserInfo,
};

export default allActions;
