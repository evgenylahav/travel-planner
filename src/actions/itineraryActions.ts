import { UPDATE_ITINERARY } from ".";
import { ItineraryDay } from "../reducers/interfaces";

export const updateItinerary = (itinerary: ItineraryDay[]) => {
  return {
    type: UPDATE_ITINERARY,
    payload: itinerary,
  };
};
