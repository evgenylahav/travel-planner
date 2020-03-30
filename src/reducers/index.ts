import { combineReducers } from 'redux'
import ConfigReducer from './configReducer'
import ItineraryReducer from './itineraryReducer'

const rootReducer = combineReducers({
    config: ConfigReducer,
    itinerary: ItineraryReducer,
});

export default rootReducer;