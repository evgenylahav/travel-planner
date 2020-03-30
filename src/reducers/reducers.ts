import { ApplicationState } from "./interfaces";


export const INITIAL_STATE: ApplicationState = {
    request: {
      participants: "",
      tripType: "",
      tripLength: 0,
    },
    places: [
        {
            name: "",
            position: {
                lag: 0.0,
                loc: 0.0
            }
        }
    ]
  };