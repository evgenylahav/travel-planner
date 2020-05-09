import { ApplicationState } from "./interfaces";

export const INITIAL_STATE: ApplicationState = {
  request: {
    participants: "",
    tripType: "",
    tripLength: 0,
    tripName: "",
  },
  currentPlace: null,
  currentDay: null,
  currentTrip: null,
  places: [],
  filteredPlaces: [],
  days: [],
  myItinerary: [],
  myTrips: [],
  loggedIn: false,
};
