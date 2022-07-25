import { loginActionType } from "../actionType/login.actionType";

const { LOGIN, LOGOUT } = loginActionType;

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
