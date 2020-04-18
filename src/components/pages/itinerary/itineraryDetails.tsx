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
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
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
import TripSelector from "./tripSelector";
import EditIcon from "@material-ui/icons/Edit";
import AddTrip from "./addTrip";
import { updateCurrentTrip } from "../../../actions/tripsActons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "90%",
    display: "grid",
    gridTemplateRows: "1fr 1fr 5fr",
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
  const [showAddNewTrip, setShowAddNewTrip] = useState(false);
  const [allTrips, setAllTrips] = useState({ tripNames: [] });
  const [showAllTrips, setShowAllTrips] = useState(false);

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

  const handleLoad = () => {
    fetch("/get_all_trip_names")
      .then((res: any) => res.json())
      .then((data) => {
        data.tripNames.unshift("");
        console.log(data);
        setAllTrips(data);
        setShowAllTrips(true);
      });
  };

  const handleLoadLast = () => {
    fetch("/load_last_trip")
      .then((res: any) => res.json())
      .then((updatedItinerary: any) => {
        dispatch(updateItineraryFromServer(updatedItinerary.itinerary));
        dispatch(updateCurrentTrip({ tripName: updatedItinerary.tripName }));
      });
  };

  const handleSave = () => {
    const saveReq: SaveItineraryRequest = {
      timestamp: Date.now(),
      tripName: currentTrip.tripName,
      itinerary: myItinerary,
    };
    fetch("/update_my_itinerary", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveReq),
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

  const handleOpenAddNewTrip = () => {
    console.log("handleOpenAddNewTrip");
    setShowAddNewTrip(true);
  };

  const handleCloseAddNewTrip = () => {
    setShowAddNewTrip(false);
  };

  const handleCloseAllTrips = () => {
    setShowAllTrips(false);
  };

  console.log(allTrips);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <div className={classes.tripSelector}>
          <Tooltip title="Create a new trip">
            <Fab
              variant="extended"
              size="small"
              color="primary"
              className={classes.extendedIcon}
              onClick={handleOpenAddNewTrip}
            >
              <AddIcon />
              Create New Trip
            </Fab>
          </Tooltip>
          <Typography>{tripName}</Typography>
          <IconButton disabled={currentTrip ? false : true}>
            <EditIcon color="primary" fontSize="small" onClick={() => {}} />
          </IconButton>
        </div>
        <div style={{ marginTop: "20px", justifyItems: "center" }}>
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
          {/* <Divider orientation="vertical" /> */}
          <Tooltip title="Load last trip">
            <Fab
              variant="extended"
              color="default"
              size="small"
              onClick={() => handleLoadLast()}
              style={{
                marginRight: "10px",
                marginBottom: "20px",
                marginLeft: "40px",
              }}
            >
              <FolderOpenIcon />
              Load Last Trip
            </Fab>
          </Tooltip>
          <Tooltip title="Load a trip">
            <Fab
              color="default"
              size="small"
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
          {/* Show all trips */}
          {showAllTrips && (
            <TripSelector
              trips={allTrips.tripNames}
              close={handleCloseAllTrips}
            />
          )}

          <Tooltip title="Save a trip">
            <Fab
              color="default"
              size="small"
              onClick={() => handleSave()}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              <SaveIcon />
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

        {/* Add new trip */}
        {showAddNewTrip && <AddTrip close={handleCloseAddNewTrip} />}
      </Container>
    </React.Fragment>
  );
}
