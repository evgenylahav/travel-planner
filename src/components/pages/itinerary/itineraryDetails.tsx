import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { ThunkDispatch } from "redux-thunk";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Fab,
  Tooltip,
  CssBaseline,
  Container,
  Divider,
  Typography,
  IconButton,
} from "@material-ui/core/";

import AddLocationIcon from "@material-ui/icons/AddLocation";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SaveIcon from "@material-ui/icons/Save";
// import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import {
  Day,
  ItineraryDay,
  SaveItineraryRequest,
} from "../../../reducers/interfaces";
import { updateDays, updateCurrentDay } from "../../../actions/daysActions";
import { AddPlace } from "./addPlaceDialog";
import { ListOfDays } from "./listOfDays";
import AddIcon from "@material-ui/icons/Add";
import { updateItineraryFromServer } from "../../../actions/itineraryActions";
import { RootState } from "../../../reducers";
import { ListOfPlaces } from "./listOfPlaces";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "90%",
    display: "grid",
    gridTemplateRows: "50px 50px 400px",
  },
  tripSelector: {
    display: "flex",
    alignItems: "center",
  },
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 3px 1fr",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export function ItineraryDetails() {
  const classes = useStyles();
  const [showAddPlaceDialog, setShowAddPlaceDialog] = useState(false);

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const dispatch = useDispatch();

  const days = itinerary.days;
  const myItinerary = itinerary.myItinerary;
  const currentTrip = itinerary.currentTrip;

  const tripName = currentTrip ? currentTrip.tripName : "";

  const handleAddPlace = () => {
    setShowAddPlaceDialog(true);
  };

  const handleCloseAddPlaceDialog = () => {
    setShowAddPlaceDialog(false);
  };

  const handleAddANewDay = () => {
    const newDayName = `Day ${days.length + 1}`;
    const newDay: Day = {
      name: newDayName,
    };
    const newDays = days.concat(newDay);
    dispatch(updateDays(newDays));
    dispatch(updateCurrentDay(newDay));

    // update my itinerary
    const newDayInItinerary: ItineraryDay = {
      order: myItinerary.length,
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
      <Container maxWidth="sm" className={classes.root}>
        <div className={classes.tripSelector}>
          <Typography>{tripName}</Typography>
        </div>
        <div>
          <Tooltip title="Add a new day">
            <Fab
              variant="extended"
              disabled={currentTrip ? false : true}
              size="small"
              color="primary"
              className={classes.extendedIcon}
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
              disabled={currentTrip ? false : true}
              size="small"
              onClick={handleAddPlace}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              <AddLocationIcon />
            </Fab>
          </Tooltip>
        </div>
        <div className={classes.daysGrid}>
          <ListOfDays />
          <Divider orientation="vertical" />
          <ListOfPlaces />
        </div>

        {/* <DaysTabs /> */}
        {showAddPlaceDialog && (
          <AddPlace handleClose={handleCloseAddPlaceDialog} />
        )}
      </Container>
    </React.Fragment>
  );
}
