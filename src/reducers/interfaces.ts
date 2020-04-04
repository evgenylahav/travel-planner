export interface ApplicationState {
    request: ConfigurationRequest;
    places: Place[];
    days: Day[];
}

export interface ConfigurationRequest {
    participants: string;
    tripType: string;
    tripLength: number;
}

export interface Place {
    id: number // unique identifier of the place
    name: string; // the name of the place
    sleeping: boolean; // is it a place of a sleepover (hotel, B&B, ...)
    position: PlacePosition; // the position of the place on the map
    date?: string; // the date of the arrival
    time?: string; // the time of the arrival
    day: string; // if there is no date, it is possible to use arbitrary day
}

export interface PlacePosition {
    lag: number;
    loc: number;
}

export interface Day {
    name: string;
    date?:  string;
}
