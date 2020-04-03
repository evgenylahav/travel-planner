import { combineReducers, AnyAction, Reducer } from 'redux'
import ConfigReducer from './configReducer'
import ItineraryReducer from './itineraryReducer'

const rootReducer = combineReducers({
    config: ConfigReducer,
    itinerary: ItineraryReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
