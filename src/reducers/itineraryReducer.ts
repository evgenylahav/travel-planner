import { UPDATE_PLACES } from '../actions';
import { INITIAL_STATE } from './reducers';


export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_PLACES: {
      return {
        ...state,
        places: action.payload
      };
    }
    default:
      return state;
  }
}