import { LOGGED_IN, USER } from "../actions";
import { INITIAL_STATE } from "./reducers";

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGGED_IN: {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    case USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
