import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Draggable from "react-draggable";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  NativeSelect,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core/";

import { RootState } from "../../../reducers";
import { Trip, ItineraryDay } from "../../../reducers/interfaces";
import { updateCurrentTrip } from "../../../actions/tripsActons";
import { updateItineraryFromServer } from "../../../actions/itineraryActions";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function TripSelector(props: any) {
  const classes = useStyles();

  const { trips, close } = props;

  const dispatch = useDispatch();

  const itinerary = useSelector((state: RootState) => state.itinerary);

  const loadItineraryFromDB = (tripName: string) => {
    const loadReq = { tripName: tripName };
    fetch("/load_itinerary", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loadReq),
    })
      .then((res: any) => res.json())
      .then((data) => dispatch(updateItineraryFromServer(data.itinerary)));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedTrip: Trip = {
      tripName: event.target.value as string,
    };
    dispatch(updateCurrentTrip(selectedTrip));
    loadItineraryFromDB(selectedTrip.tripName);
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
          Select your trip
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="uncontrolled-native">Trip Name</InputLabel>
            <NativeSelect
              defaultValue={""}
              inputProps={{
                name: "name",
                id: "uncontrolled-native",
              }}
              onChange={handleChange}
            >
              {trips.map((item: string, index: number) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}
