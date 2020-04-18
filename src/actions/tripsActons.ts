import { UPDATE_TRIPS, UPDATE_CURRENT_TRIP } from ".";
import Redux from "redux";
import { Trip, SaveItineraryRequest } from "../reducers/interfaces";

export const updateTrips = (trips: Trip[]) => {
  return {
    type: UPDATE_TRIPS,
    payload: trips,
  };
};

export const updateCurrentTrip = (trip: Trip) => {
  return {
    type: UPDATE_CURRENT_TRIP,
    payload: trip,
  };
};

export const addTripToDB = (tripName: string) => {
  return (dispatch: Redux.Dispatch<any>) => {
    const saveReq: SaveItineraryRequest = {
      timestamp: Date.now(),
      tripName: tripName,
      itinerary: [],
    };
    return fetch("/create_new_trip", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveReq),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(console.log(data));
      })
      .catch((err) => console.log(err));
  };
};
