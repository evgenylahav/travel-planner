import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

export function TogglePlaceType(props: any) {
  const { handlePlaceType, inputPlace } = props;

  const [placeType, setPlaceType] = useState<string>(
    inputPlace === null ? "place" : inputPlace
  );
  const classes = useStyles();

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    newPlaceType: string
  ) => {
    setPlaceType(newPlaceType);
    handlePlaceType(newPlaceType);
  };

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        exclusive
        value={placeType}
        onChange={handleClick}
        aria-label="place-type"
      >
        <ToggleButton value="place">
          <PlaceIcon />
        </ToggleButton>
        <ToggleButton value="hotel">
          <HotelIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
