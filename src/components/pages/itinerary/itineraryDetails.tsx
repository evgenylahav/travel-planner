import React from "react";
import { connect } from 'react-redux';

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { Place, Day } from "../../../reducers/interfaces";
import { updatePlaces } from "../../../actions/placesActions";
import { updateDays } from '../../../actions/daysActions';
import { AddPlace } from "./addPlaceDialog";
import { DaysTabs } from "./daysTabs";
import AddIcon from "@material-ui/icons/Add";

const classes = require("./itineraryDetails.scss");

export interface ItineraryDetailsStoreProps {
  places: Place[];
  days: Day[];
}

export interface ItineraryDetailsDispatchProps {
  handleUpdatePlaces: (places: Place[]) => void;
  handleUpdateDays: (days: Day[]) => void;
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

  handleAddANewDay = () => {
    const { days } = this.props;
    console.log(days);
    const newDay: Day = {
      name: `Day ${days.length + 1}`,
    }
    console.log(newDay);
    const newDays = days.concat(newDay);
    console.log(newDays);
    this.props.handleUpdateDays(newDays);
  }

  render() {
    const { places, days } = this.props;
    console.log(places);
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" style={{ marginTop: "20px", justifyItems: "center" }}>
          <span>
          <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={this.handleAddANewDay}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Add A New Day
            </Button>
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
            {/* <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<FlightTakeoffIcon />}
              onClick={this.handleAddPlace}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Complete Itinerary
            </Button> */}
          </span>
          <DaysTabs />
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
    handleUpdateDays: (s: Day[]) => dispatch(updateDays(s)),
  };
}

export const ItineraryDetails =
  connect<ItineraryDetailsStoreProps, ItineraryDetailsDispatchProps, ItineraryDetailsOwnProps>(mapStateToProps, mapActionToProps)(ItineraryDetailsInternal);