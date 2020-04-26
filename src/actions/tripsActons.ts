import { UPDATE_TRIPS, UPDATE_CURRENT_TRIP } from ".";
import Redux from "redux";
import { Trip, SaveItineraryRequest, User } from "../reducers/interfaces";

export const updateTrips = (trips: Trip[]) => {
  return {
    type: UPDATE_TRIPS,
    payload: trips,
  };
};

export const updateCurrentTrip = (trip: Trip | null) => {
  return {
    type: UPDATE_CURRENT_TRIP,
    payload: trip,
  };
};

export const resetCurrentTrip = () => {
  return (dispatch: Redux.Dispatch<any>) => {
    dispatch(updateCurrentTrip(null));
  };
};

export const addTripToDB = (tripName: string, user: User) => {
  return (dispatch: Redux.Dispatch<any>) => {
    const saveReq: SaveItineraryRequest = {
      timestamp: Date.now(),
      tripName: tripName,
      itinerary: [],
      user: user,
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
