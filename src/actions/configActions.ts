import { UPDATE_PARTICIPANTS } from '.';

export const updateParticipants = (request: string) => {
    console.log("I'm inside updateParticipants")
    return {
        type: UPDATE_PARTICIPANTS,
        payload: request
    }
}