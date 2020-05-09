import { LOGGED_IN } from "../actions";
import { INITIAL_STATE } from "./reducers";

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGGED_IN: {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    default:
      return state;
  }
};
