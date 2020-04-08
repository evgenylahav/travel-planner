import { UPDATE_PLACES, UPDATE_DAYS, UPDATE_CURRENT_PLACE } from "../actions";
import { INITIAL_STATE } from "./reducers";

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_PLACES: {
      return {
        ...state,
        places: action.payload,
      };
    }
    case UPDATE_DAYS: {
      return {
        ...state,
        days: action.payload,
      };
    }
    case UPDATE_CURRENT_PLACE: {
      return {
        ...state,
        currentPlace: action.payload,
      };
    }
    default:
      return state;
  }
};
