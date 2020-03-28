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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
        <PlacesList />
        <div style={{ height: "100vh", width: "100vm" }}>
        <WrappedMap
          googleMapURL={
            `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=
            geometry,drawing,places&key=AIzaSyDCOzagzkQXlv7tDx4DTXFs2MdF6wBD1Sw`
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
