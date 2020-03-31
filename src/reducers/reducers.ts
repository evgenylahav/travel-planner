import { ApplicationState } from "./interfaces";


export const INITIAL_STATE: ApplicationState = {
    request: {
      participants: "",
      tripType: "",
      tripLength: 0,
    },
    places: [
        {
            id: 1,
            name: "",
            sleeping: false,
            day: 1,
            position: {
                lag: 0.0,
                loc: 0.0
            }
        }
    ]
  };