import React from "react";
import { PlacesList } from './placesList';
import { MapBox } from './mapBox';

export interface ItineraryProps {}

export interface ItineraryState {
}

export class Itinerary extends React.Component<
  ItineraryProps,
  ItineraryState
> {
  constructor(props: ItineraryProps, state: ItineraryState) {
    super(props, state);
    this.state = {
    };
  }

  render() {

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
        <PlacesList />
        <MapBox />
      </div>
    );
  }
}
