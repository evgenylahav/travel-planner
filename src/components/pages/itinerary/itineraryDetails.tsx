import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SaveIcon from "@material-ui/icons/Save";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { Place, Day, ItineraryDay } from "../../../reducers/interfaces";
import { updateDays } from "../../../actions/daysActions";
import { AddPlace } from "./addPlaceDialog";
import { DaysTabs } from "./daysTabs";
import AddIcon from "@material-ui/icons/Add";
import {
  updateItinerary,
  updateItineraryFromServer,
} from "../../../actions/itineraryActions";

const classes = require("./itineraryDetails.scss");

export interface ItineraryDetailsStoreProps {
  days: Day[];
  myItinerary: ItineraryDay[];
}

export interface ItineraryDetailsDispatchProps {
  handleUpdateDays: (days: Day[]) => void;
  handleUpdateMyItinerary: (itinerary: ItineraryDay[]) => void;
}

export interface ItineraryDetailsOwnProps {}

export type ItineraryDetailsProps = ItineraryDetailsStoreProps &
  ItineraryDetailsDispatchProps &
  ItineraryDetailsOwnProps;

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
  };

  handleAddPlace = () => {
    this.setState({ showAddPlaceDialog: true });
  };

  handleCloseAddPlaceDialog = () => {
    this.setState({ showAddPlaceDialog: false });
  };

  handleLoad = () => {
    fetch("/get_my_itinerary")
      .then((res: any) => res.json())
      .then((updatedItinerary: ItineraryDay[]) =>
        this.props.handleUpdateMyItinerary(updatedItinerary)
      );
  };

  handleSave = () => {
    const { myItinerary } = this.props;
    console.log(myItinerary);
    fetch("/update_my_itinerary", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myItinerary),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  handleAddANewDay = () => {
    const { days, myItinerary } = this.props;
    const newDayName = `Day ${days.length + 1}`;
    const newDay: Day = {
      name: newDayName,
    };
    const newDays = days.concat(newDay);
    this.props.handleUpdateDays(newDays);

    // update my itinerary
    const newDayInItinerary: ItineraryDay = {
      dayName: newDayName,
      places: [],
    };

    const updatedItinerary: ItineraryDay[] = myItinerary.concat(
      newDayInItinerary
    );
    this.props.handleUpdateMyItinerary(updatedItinerary);
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          style={{ marginTop: "20px", justifyItems: "center" }}
        >
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
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<FolderOpenIcon />}
              onClick={() => this.handleLoad()}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Load
            </Button>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={() => this.handleSave()}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Save
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
          {this.state.showAddPlaceDialog && (
            <AddPlace handleClose={this.handleCloseAddPlaceDialog} />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any): ItineraryDetailsStoreProps {
  const itineraryState = state.itinerary;
  return {
    days: itineraryState.days,
    myItinerary: itineraryState.myItinerary,
  };
}

function mapActionToProps(dispatch: ThunkDispatch<{}, {}, any>) {
  return {
    handleUpdateDays: (s: Day[]) => dispatch(updateDays(s)),
    handleUpdateMyItinerary: (s: ItineraryDay[]) =>
      dispatch(updateItineraryFromServer(s)),
  };
}

export const ItineraryDetails = connect<
  ItineraryDetailsStoreProps,
  ItineraryDetailsDispatchProps,
  ItineraryDetailsOwnProps
>(
  mapStateToProps,
  mapActionToProps
)(ItineraryDetailsInternal);
