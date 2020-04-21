import { UPDATE_ITINERARY } from ".";
import Redux from "redux";
import { ItineraryDay, Day } from "../reducers/interfaces";
import { updateDays, updateCurrentDay, updateDayAndPlace } from "./daysActions";

export const updateItinerary = (itinerary: ItineraryDay[]) => {
  const sortedItinerary = itinerary.sort((a, b) =>
    a.order > b.order ? 1 : -1
  );
  return {
    type: UPDATE_ITINERARY,
    payload: sortedItinerary,
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

  if (myItinerary.length > 0) {
    dispatch(updateDayAndPlace(myItinerary[0]));
  }
};
