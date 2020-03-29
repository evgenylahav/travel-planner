import { UPDATE_PARTICIPANTS } from '../actions';

const INITIAL_STATE = {
  participants: ""
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_PARTICIPANTS: {
      return {
        ...state,
        participants: action.payload
      };
    }
    default:
      return state;
  }
}