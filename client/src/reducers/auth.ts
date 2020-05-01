import { ActionTypes } from '../actions/types';

export const user = (
  state: {
    id: string;
    firstName: string;
    lastName: string;
    street: string;
    number: string;
    role: string;
    phoneNumber: string;
  } = {
    id: '',
    firstName: '',
    lastName: '',
    street: '',
    number: '',
    role: '',
    phoneNumber: '',
  },
  action: {
    type: ActionTypes;
    payload: {
      id: string;
      firstName: string;
      lastName: string;
      street: string;
      number: string;
      role: string;
      phoneNumber: string;
    };
  }
) => {
  console.log(action.payload);
  switch (action.type) {
    case ActionTypes.login: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.logout: {
      return {
        id: '',
        firstName: '',
        lastName: '',
        street: '',
        number: '',
        role: '',
        phoneNumber: '',
      };
    }
    case ActionTypes.addUserInfo: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
