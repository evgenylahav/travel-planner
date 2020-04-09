import { UPDATE_PLACES, UPDATE_CURRENT_PLACE, UPDATE_FILTERED_PLACES } from ".";
import { Place } from "../reducers/interfaces";

export const updatePlaces = (places: Place[]) => {
  //   const sortedPlaces = places.sort((a, b) => (a.id > b.id ? 1 : -1));
  return {
    type: UPDATE_PLACES,
    payload: places,
  };
};

export const updateCurrentPlace = (place: Place) => {
  return {
    type: UPDATE_CURRENT_PLACE,
    payload: place,
  };
};

export const updateFilteredPlaces = (places: Place[]) => {
  return {
    type: UPDATE_FILTERED_PLACES,
    payload: places,
  };
};
