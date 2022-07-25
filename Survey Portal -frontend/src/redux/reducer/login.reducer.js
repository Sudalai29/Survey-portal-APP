import { loginActionType } from "../actionType/login.actionType";

const { LOGIN, LOGOUT } = loginActionType;

const initialState = {
  user: null,
  loggedIn: false,
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { user: payload, loggedIn: true };
    case LOGOUT:
      return { user: null, loggedIn: false };
    default:
      return state;
  }
};
