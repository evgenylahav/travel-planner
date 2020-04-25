import { LOGGED_IN } from ".";

export const updateLoggedIn = (request: boolean) => {
  return {
    type: LOGGED_IN,
    payload: request,
  };
};
