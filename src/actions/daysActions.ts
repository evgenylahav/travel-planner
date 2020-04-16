import { UPDATE_DAYS, UPDATE_CURRENT_DAY } from ".";
import { Day } from "../reducers/interfaces";

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
