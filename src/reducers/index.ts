import { combineReducers, AnyAction, Reducer } from "redux";
import ConfigReducer from "./configReducer";
import ItineraryReducer from "./itineraryReducer";
import AuthReducer from "./authReducer";

const rootReducer = combineReducers({
  config: ConfigReducer,
  itinerary: ItineraryReducer,
  auth: AuthReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
