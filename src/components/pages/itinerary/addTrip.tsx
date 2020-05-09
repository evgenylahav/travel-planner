import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@material-ui/core";

import Draggable from "react-draggable";
import { RootState } from "../../../reducers";
import { Trip, SaveItineraryRequest } from "../../../reducers/interfaces";
import {
  updateTrips,
  updateCurrentTrip,
  addTripToDB,
} from "../../../actions/tripsActons";
import {
  updateItinerary,
  updateItineraryFromServer,
} from "../../../actions/itineraryActions";
import { SessionContext } from "../../session";

function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 100,
    height: 140,
  },
});

export default function AddTrip(props: any) {
  const classes = useStyles();

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const myTrips = itinerary.myTrips;

  // const auth = useSelector((state: RootState) => state.auth);
  // const user = auth.user;

  const session = useContext(SessionContext);
  const user = session.user;

  const dispatch = useDispatch();

  const [tripName, setTripName] = useState("");
  const { close } = props;

  const handleAddTrip = (value: string) => {
    setTripName(value);
  };

  const handleConfirm = () => {
    const newTrip: Trip = {
      tripName: tripName,
    };

    const updatedTrips = myTrips.concat(newTrip);

    dispatch(updateTrips(updatedTrips));
    dispatch(updateCurrentTrip(newTrip));

    dispatch(updateItineraryFromServer([]));

    dispatch(addTripToDB(tripName, user));

    close();
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={true}
        onClose={close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"md"}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add a new trip
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label={"Enter trip name"}
              variant="outlined"
              onChange={(e) => handleAddTrip(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            disabled={tripName === ""}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleConfirm();
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
