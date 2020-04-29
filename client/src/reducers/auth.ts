import { ActionTypes } from "../actions/types";

export const user = (
  state: {
    id: string;
    firstName: string;
    lastName: string;
    street: string;
    number: string;
  } = {
    id: "",
    firstName: "",
    lastName: "",
    street: "",
    number: "",
  },
  action: {
    type: ActionTypes;
    payload: {
      id: string;
      firstName: string;
      lastName: string;
      street: string;
      number: string;
    };
  }
) => {
  switch (action.type) {
    case ActionTypes.login: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.logout: {
      return { id: "", firstName: "", lastName: "", street: "", number: "" };
    }
    case ActionTypes.addUserInfo: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
