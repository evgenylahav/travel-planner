import { UPDATE_PLACES, UPDATE_CURRENT_PLACE, UPDATE_FILTERED_PLACES } from ".";
import Redux from "redux";
import { Place } from "../reducers/interfaces";

export const updatePlaces = (places: Place[]) => {
  //   const sortedPlaces = places.sort((a, b) => (a.id > b.id ? 1 : -1));
  return {
    type: UPDATE_PLACES,
    payload: places,
  };
};

export const updateCurrentPlace = (place: Place | null) => {
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

export const resetCurrentPlace = () => {
  return (dispatch: Redux.Dispatch<any>) => {
    dispatch(updateCurrentPlace(null));
  };
};
