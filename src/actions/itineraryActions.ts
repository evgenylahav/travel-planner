import { UPDATE_ITINERARY } from ".";
import Redux from "redux";
import { ItineraryDay, Day } from "../reducers/interfaces";
import { updateDays } from "./daysActions";

export const updateItinerary = (itinerary: ItineraryDay[]) => {
  return {
    type: UPDATE_ITINERARY,
    payload: itinerary,
  };
};

export const updateItineraryFromServer = (myItinerary: ItineraryDay[]) => (
  dispatch: Redux.Dispatch<any>
) => {
  // update days
  const dayNames: string[] = myItinerary.map(
    (item: ItineraryDay) => item.dayName
  );
  const days: Day[] = dayNames.map((item: string) => {
    return {
      name: item,
    };
  });
  dispatch(updateDays(days));
  dispatch(updateItinerary(myItinerary));
};
