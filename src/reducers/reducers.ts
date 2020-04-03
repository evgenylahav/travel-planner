import { ApplicationState } from "./interfaces";
import {Action, Reducer} from "redux";

export const INITIAL_STATE: ApplicationState = {
  request: {
    participants: "",
    tripType: "",
    tripLength: 0,
  },
  places: [],
  days: [
    { name: "Day 1" },
  ]
};
