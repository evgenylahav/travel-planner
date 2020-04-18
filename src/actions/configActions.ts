import { UPDATE_CONFIGURATION } from ".";
import { ConfigurationRequest } from "../reducers/interfaces";

export const updateConfigurationRequest = (request: ConfigurationRequest) => {
  console.log("I'm inside config actions");
  console.log(request);
  return {
    type: UPDATE_CONFIGURATION,
    payload: request,
  };
};
