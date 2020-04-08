import { ApplicationState } from "./interfaces";

export const INITIAL_STATE: ApplicationState = {
  request: {
    participants: "",
    tripType: "",
    tripLength: 0,
  },
  currentPlace: null,
  places: [],
  days: [],
};
