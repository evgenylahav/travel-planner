import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, NativeSelect } from "@material-ui/core/";

import { RootState } from "../../../reducers";
import { Trip } from "../../../reducers/interfaces";
import { updateCurrentTrip } from "../../../actions/tripsActons";

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

export default function TripSelector() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const itinerary = useSelector((state: RootState) => state.itinerary);

  const trips = itinerary.myTrips;
  const currentTrip = itinerary.currentTrip;

  const selectedName = currentTrip ? currentTrip.tripName : "";

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedTrip: Trip = {
      tripName: event.target.value as string,
    };
    dispatch(updateCurrentTrip(selectedTrip));
  };

  console.log(trips);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="uncontrolled-native">Trip Name</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "name",
            id: "uncontrolled-native",
          }}
          value={selectedName}
          onChange={handleChange}
        >
          {trips.map((item: Trip, index: number) => {
            return (
              <option key={index} value={item.tripName}>
                {item.tripName}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
