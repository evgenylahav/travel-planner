import { UPDATE_CONFIGURATION } from '../actions';
import { INITIAL_STATE } from './reducers';


export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_CONFIGURATION: {
      return {
        ...state,
        request: action.payload
      };
    }
    default:
      return state;
  }
}