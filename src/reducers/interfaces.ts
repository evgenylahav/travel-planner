export interface ApplicationState {
  request: ConfigurationRequest;
  places: Place[];
  filteredPlaces: Place[];
  currentPlace: Place | null;
  currentDay: Day | null;
  currentTrip: Trip | null;
  days: Day[];
  myItinerary: ItineraryDay[];
  myTrips: Trip[];
  loggedIn: boolean;
  user: User;
}

export interface Trip {
  tripName: string;
}

export interface ItineraryDay {
  order: number;
  dayName: string;
  places: Place[];
}

export interface ConfigurationRequest {
  participants: string;
  tripType: string;
  tripLength: number;
  tripName: string;
}

export interface Place {
  id: number; // unique identifier of the place
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
  lat: number;
  lng: number;
}

export interface Day {
  name: string;
  date?: string;
}

// rest api
export interface SaveItineraryRequest {
  timestamp: number;
  tripName: string;
  itinerary: ItineraryDay[];
  user: User;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
