import {
  UPDATE_PLACES,
  UPDATE_DAYS,
  UPDATE_CURRENT_PLACE,
  UPDATE_FILTERED_PLACES,
  UPDATE_ITINERARY,
  UPDATE_CURRENT_DAY,
  UPDATE_TRIPS,
  UPDATE_CURRENT_TRIP,
} from "../actions";
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
    case UPDATE_CURRENT_DAY: {
      return {
        ...state,
        currentDay: action.payload,
      };
    }
    case UPDATE_CURRENT_PLACE: {
      return {
        ...state,
        currentPlace: action.payload,
      };
    }
    case UPDATE_FILTERED_PLACES: {
      return {
        ...state,
        filteredPlaces: action.payload,
      };
    }
    case UPDATE_ITINERARY: {
      return {
        ...state,
        myItinerary: action.payload,
      };
    }
    case UPDATE_TRIPS: {
      return {
        ...state,
        myTrips: action.payload,
      };
    }
    case UPDATE_CURRENT_TRIP: {
      return {
        ...state,
        currentTrip: action.payload,
      };
    }
    default:
      return state;
  }
};
