import { UPDATE_PLACES } from '.';
import { Places } from '../reducers/interfaces';


export const updatePlaces = (places: Places[]) => {
    return {
        type: UPDATE_PLACES,
        payload: places
    }
}