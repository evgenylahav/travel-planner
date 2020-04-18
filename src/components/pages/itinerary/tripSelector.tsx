import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, NativeSelect } from "@material-ui/core/";

import { RootState } from "../../../reducers";
import { Trip, ItineraryDay } from "../../../reducers/interfaces";
import { updateCurrentTrip } from "../../../actions/tripsActons";
import { updateItineraryFromServer } from "../../../actions/itineraryActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    <div>
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
    </div>
  );
}
