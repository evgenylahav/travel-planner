import { UPDATE_CONFIGURATION } from '.';
import { ConfigurationRequest } from '../reducers/interfaces';


export const updateConfigurationRequest = (request: ConfigurationRequest) => {
    return {
        type: UPDATE_CONFIGURATION,
        payload: request
    }
}