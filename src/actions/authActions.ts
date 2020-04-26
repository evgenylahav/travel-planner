import { LOGGED_IN, USER } from ".";
import { User } from "../reducers/interfaces";

export const updateLoggedIn = (request: boolean) => {
  return {
    type: LOGGED_IN,
    payload: request,
  };
};

export const updateUser = (request: User) => {
  return {
    type: USER,
    payload: request,
  };
};
