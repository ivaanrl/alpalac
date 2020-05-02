import { ActionTypes } from './types';

export const login = (payload: {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  address: string;
  phoneNumber: string;
}) => {
  return {
    type: ActionTypes.login,
    payload,
  };
};

export const logout = () => {
  return {
    type: ActionTypes.logout,
  };
};

export const addUserInfo = (payload: {
  street: string;
  number: string;
  phoneNumber: string;
}) => {
  return {
    type: ActionTypes.addUserInfo,
    payload,
  };
};
