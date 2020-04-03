import React from "react";
import { connect } from 'react-redux';

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { Place, Day } from "../../../reducers/interfaces";
import { updatePlaces } from "../../../actions/placesActions";
import { AddPlace } from "./addPlaceDialog";
import { DaysTabs } from "./daysTabs";

const classes = require("./itineraryDetails.scss");

export interface ItineraryDetailsStoreProps {
  places: Place[];
  days: Day[];
}

export interface ItineraryDetailsDispatchProps {
  handleUpdatePlaces: (places: Place[]) => void;
}

export interface ItineraryDetailsOwnProps { }

export type ItineraryDetailsProps =
  ItineraryDetailsStoreProps
  & ItineraryDetailsDispatchProps
  & ItineraryDetailsOwnProps;

export interface ItineraryDetailsState {
  currentDay: string | undefined;
  showAddPlaceDialog: boolean;
}

export class ItineraryDetailsInternal extends React.Component<
  ItineraryDetailsProps,
  ItineraryDetailsState
  > {
  constructor(props: ItineraryDetailsProps, state: ItineraryDetailsState) {
    super(props, state);
    this.state = {
      currentDay: "",
      showAddPlaceDialog: false,
    };
  }

  handleUpdateCurrentDay = (currentDay: string | undefined) => {
    this.setState({ currentDay });
  }

  handleAddPlace = () => {
    this.setState({ showAddPlaceDialog: true });
  }

  handleCloseAddPlaceDialog = () => {
    this.setState({ showAddPlaceDialog: false });
  }

  render() {
    const { places, days } = this.props;
    console.log(places);
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" style={{ marginTop: "20px", justifyItems: "center" }}>
          <span style={{  }}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<AddLocationIcon />}
              onClick={this.handleAddPlace}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Add Place
            </Button>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<FlightTakeoffIcon />}
              onClick={this.handleAddPlace}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Complete Itinerary
            </Button>
          </span>
          <DaysTabs places={places} days={days} />
          {this.state.showAddPlaceDialog &&
            <AddPlace
              handleClose={this.handleCloseAddPlaceDialog}
            />
          }
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any): ItineraryDetailsStoreProps {
  const itineraryState = state.itinerary;
  return {
    places: itineraryState.places,
    days: itineraryState.days,
  };
}

function mapActionToProps(dispatch: any) {
  return {
    handleUpdatePlaces: (s: Place[]) => dispatch(updatePlaces(s)),
  };
}

export const ItineraryDetails =
  connect<ItineraryDetailsStoreProps, ItineraryDetailsDispatchProps, ItineraryDetailsOwnProps>(mapStateToProps, mapActionToProps)(ItineraryDetailsInternal);