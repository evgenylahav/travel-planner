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
    day: string; // when the place will  be visitted
    description: string; // provides descrition regardng the place
    media?: any; // provides media (mainly images) of the place
    web?: string; // provides the web-site link
    date?: string; // the date of the arrival
    time?: string; // the time of the arrival
    
}

export interface PlacePosition {
    lag: number;
    loc: number;
}

export interface Day {
    name: string;
    date?:  string;
}
