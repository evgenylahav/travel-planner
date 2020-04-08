import { UPDATE_PLACES, UPDATE_CURRENT_PLACE } from ".";
import { Place } from "../reducers/interfaces";

export const updatePlaces = (places: Place[]) => {
  const sortedPlaces = places.sort((a, b) => (a.id > b.id ? 1 : -1));
  return {
    type: UPDATE_PLACES,
    payload: sortedPlaces,
  };
};

export const updateCurrentPlace = (place: Place) => {
  return {
    type: UPDATE_CURRENT_PLACE,
    payload: place,
  };
};
