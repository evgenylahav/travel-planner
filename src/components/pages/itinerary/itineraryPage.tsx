import React from "react";
import { PlacesList } from "./placesList";
import { WrappedMap } from "./wrappedMap";

export interface ItineraryProps {}

export interface ItineraryState {}

export class Itinerary extends React.Component<ItineraryProps, ItineraryState> {
  constructor(props: ItineraryProps, state: ItineraryState) {
    super(props, state);
    this.state = {};
  }

  render() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "2fr 4fr" }}>
        <PlacesList />
        <div style={{ height: "100vh", width: "100vm" }}>
        <WrappedMap
          googleMapURL={
            `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=
            geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`
          }
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
        </div>
      </div>
    );
  }
}
