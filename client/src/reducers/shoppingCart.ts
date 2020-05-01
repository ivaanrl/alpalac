import { ActionTypes } from '../actions/types';

interface shoppingCartInterface {
  id: string;
  name: string;
  price: number;
  link: string;
  weight: number;
}

export interface shoppingCartArrayInterface
  extends Array<shoppingCartInterface> {}

export const shoppingCart = (
  state: {
    shoppingCart: shoppingCartArrayInterface;
  } = { shoppingCart: [] },
  action: {
    type: ActionTypes;
    payload: {
      id: string;
      name: string;
      price: number;
      link: string;
      index?: number;
      weight: number;
    };
  }
) => {
  switch (action.type) {
    case ActionTypes.addToShoppingCart: {
      const { id, name, price, link, weight } = action.payload;
      const newState = state;
      newState.shoppingCart.push({ id, name, price, link, weight });
      return { ...state, ...newState };
    }
    case ActionTypes.removeFromShoppingCart: {
      const { index } = action.payload;
      const newState = { ...state };
      if (index === 0) {
        //typescript will throw error without If.
        newState.shoppingCart.shift();
      } else if (index) {
        newState.shoppingCart.splice(index, 1);
      }
      return { ...state, ...newState };
    }
    case ActionTypes.clearShoppingCart: {
      return { shoppingCart: [] };
    }
    default:
      return state;
  }
};
