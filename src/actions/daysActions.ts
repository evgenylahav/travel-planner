import { UPDATE_DAYS } from '.';
import { Day } from '../reducers/interfaces';


export const updateDays = (days: Day[]) => {
    return {
        type: UPDATE_DAYS,
        payload: days
    }
}