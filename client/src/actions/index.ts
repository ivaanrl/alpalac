import { login, logout, addUserInfo } from "./auth";
import { addToShoppingCart, removeFromShoppingCart } from "./shoppingCart";

const allActions = {
  login,
  logout,
  addToShoppingCart,
  removeFromShoppingCart,
  addUserInfo,
};

export default allActions;
