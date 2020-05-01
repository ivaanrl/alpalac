import { ActionTypes } from './types';

export const addToShoppingCart = (payload: {
  id: string;
  name: string;
  price: number;
  link: string;
  weight: number;
}) => {
  return {
    type: ActionTypes.addToShoppingCart,
    payload,
  };
};

export const removeFromShoppingCart = (payload: { index: number }) => {
  return {
    type: ActionTypes.removeFromShoppingCart,
    payload,
  };
};

export const clearShoppingCart = () => {
  return {
    type: ActionTypes.clearShoppingCart,
  };
};
