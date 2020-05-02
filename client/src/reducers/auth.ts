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
      address: string;
      role: string;
      phoneNumber: string;
    };
  }
) => {
  switch (action.type) {
    case ActionTypes.login: {
      const newState = { ...state, ...action.payload };
      if (newState.address) {
        const address = newState.address.split(' ');

        for (let i = 0; i < address.length - 1; i++) {
          newState.street += address[i];
        }
        newState.number = address[address.length - 1];
      }

      return { ...state, ...newState };
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
