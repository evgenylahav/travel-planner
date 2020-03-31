export interface ApplicationState {
    request: ConfigurationRequest;
    places: Places[];
}

export interface ConfigurationRequest {
    participants: string;
    tripType: string;
    tripLength: number;
}

export interface Places {
    id: number
    name: string;
    sleeping: boolean;
    day: number;
    position: PlacePosition;
    date?: string;
    time?: string;
}

export interface PlacePosition {
    lag: number;
    loc: number;
}