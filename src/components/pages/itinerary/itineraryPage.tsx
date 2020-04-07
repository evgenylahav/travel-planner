import React from "react";
import { ItineraryDetails } from "./itineraryDetails";
import { WrappedMap } from "./wrappedMap";
import Box from '@material-ui/core/Box';
import { LocationsAutoComplete } from './locationsAutoComplete';
import { Place } from "../../../reducers/interfaces";

export interface ItinineraryStoreProps {}

export interface ItinineraryDispatchProps {}

export interface ItinineraryOwnProps { }

export type ItineraryProps =
ItinineraryStoreProps
  & ItinineraryDispatchProps
  & ItinineraryOwnProps;


export interface ItineraryState { }

export class Itinerary extends React.Component<ItineraryProps, ItineraryState> {
  constructor(props: ItineraryProps, state: ItineraryState) {
    super(props, state);
    this.state = {};
  }

  render() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "3fr 4fr" }}>
        <ItineraryDetails />

        <Box component="div" m={1}>
          <div style={{ height: "90vh", width: "90vm" }}>
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
        </Box>
      </div>
    );
  }
}
