import { ADD_NEW_DAY } from '.';
import { Day } from '../reducers/interfaces';


export const updateDays = (days: Day[]) => {
    const newDay: Day = {
        name: `Day ${days.length + 1}`
    }

    const newDays = days.concat(newDay);

    console.log(newDay);
    console.log(newDays);
    return {
        type: ADD_NEW_DAY,
        payload: newDays
    }
}