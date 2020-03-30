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
    name: string;
    position: PlacePosition;
}

export interface PlacePosition {
    lag: number;
    loc: number;
}