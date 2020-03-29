import { combineReducers } from 'redux'
import ConfigReducer from './configReducer'

const rootReducer = combineReducers({
    config: ConfigReducer,
});

export default rootReducer;