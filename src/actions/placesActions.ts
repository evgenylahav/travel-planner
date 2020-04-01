import { UPDATE_PLACES } from '.';
import { Place } from '../reducers/interfaces';


export const updatePlaces = (places: Place[]) => {
    const sortedPlaces = places.sort((a, b) => (a.id > b.id) ? 1 : -1);
    return {
        type: UPDATE_PLACES,
        payload: sortedPlaces
    }
}