import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { ThunkDispatch } from "redux-thunk";

import {
  Fab,
  Tooltip,
  CssBaseline,
  Container,
  Divider,
} from "@material-ui/core/";

import AddLocationIcon from "@material-ui/icons/AddLocation";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SaveIcon from "@material-ui/icons/Save";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { Day, ItineraryDay } from "../../../reducers/interfaces";
import { updateDays } from "../../../actions/daysActions";
import { AddPlace } from "./addPlaceDialog";
import { DaysTabs } from "./daysTabs";
import AddIcon from "@material-ui/icons/Add";
import { updateItineraryFromServer } from "../../../actions/itineraryActions";
import { RootState } from "../../../reducers";

const classes = require("./itineraryDetails.scss");

export interface ItineraryDetailsDispatchProps {
  handleUpdateDays: (days: Day[]) => void;
  handleUpdateMyItinerary: (itinerary: ItineraryDay[]) => void;
}

export function ItineraryDetails() {
  const [showAddPlaceDialog, setShowAddPlaceDialog] = useState(false);

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const dispatch = useDispatch();

  const days = itinerary.days;
  const myItinerary = itinerary.myItinerary;

  const handleAddPlace = () => {
    setShowAddPlaceDialog(true);
  };

  const handleCloseAddPlaceDialog = () => {
    setShowAddPlaceDialog(false);
  };

  const handleLoad = () => {
    fetch("/get_my_itinerary")
      .then((res: any) => res.json())
      .then((updatedItinerary: ItineraryDay[]) =>
        dispatch(updateItineraryFromServer(updatedItinerary))
      );
  };

  const handleSave = () => {
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

  const handleAddANewDay = () => {
    const newDayName = `Day ${days.length + 1}`;
    const newDay: Day = {
      name: newDayName,
    };
    const newDays = days.concat(newDay);
    dispatch(updateDays(newDays));

    // update my itinerary
    const newDayInItinerary: ItineraryDay = {
      dayName: newDayName,
      places: [],
    };

    const updatedItinerary: ItineraryDay[] = myItinerary.concat(
      newDayInItinerary
    );
    dispatch(updateItineraryFromServer(updatedItinerary));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="sm"
        style={{ marginTop: "20px", justifyItems: "center" }}
      >
        <span>
          <Tooltip title="Add a new day">
            <Fab
              variant="extended"
              size="small"
              color="primary"
              className={classes.fab}
              onClick={handleAddANewDay}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              <AddIcon />
              Add Day
            </Fab>
          </Tooltip>
          <Tooltip title="Add a new place">
            <Fab
              color="secondary"
              size="small"
              className={classes.fab}
              onClick={handleAddPlace}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              <AddLocationIcon />
            </Fab>
          </Tooltip>
          {/* <Divider orientation="vertical" /> */}
          <Tooltip title="Load a trip">
            <Fab
              color="default"
              size="small"
              className={classes.fab}
              onClick={() => handleLoad()}
              style={{
                marginRight: "10px",
                marginBottom: "20px",
                marginLeft: "40px",
              }}
            >
              <FolderOpenIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Save a trip">
            <Fab
              color="default"
              size="small"
              className={classes.fab}
              onClick={() => handleSave()}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              <SaveIcon />
            </Fab>
          </Tooltip>
        </span>
        <DaysTabs />
        {showAddPlaceDialog && (
          <AddPlace handleClose={handleCloseAddPlaceDialog} />
        )}
      </Container>
    </React.Fragment>
  );
}
