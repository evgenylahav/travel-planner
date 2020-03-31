import { UPDATE_PLACES } from '.';
import { Places } from '../reducers/interfaces';


export const updatePlaces = (places: Places[]) => {
    const sortedPlaces = places.sort((a, b) => (a.id > b.id) ? 1 : -1);
    return {
        type: UPDATE_PLACES,
        payload: sortedPlaces
    }
}