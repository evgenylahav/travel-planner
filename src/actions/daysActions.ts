import Redux from "redux";
import { UPDATE_DAYS, UPDATE_CURRENT_DAY } from ".";
import { Day, ItineraryDay } from "../reducers/interfaces";
import { updateCurrentPlace } from "./placesActions";

export const updateDays = (days: Day[]) => {
  return {
    type: UPDATE_DAYS,
    payload: days,
  };
};

export const updateCurrentDay = (day: Day) => {
  return {
    type: UPDATE_CURRENT_DAY,
    payload: day,
  };
};

export const updateDayAndPlace = (itineraryDay: ItineraryDay) => (
  dispatch: Redux.Dispatch<any>
) => {
  // update current day
  dispatch(updateCurrentDay({ name: itineraryDay.dayName }));

  const places = itineraryDay.places;

  if (places.length > 0) {
    const place = places[0];
    dispatch(updateCurrentPlace(place));
  }
};
