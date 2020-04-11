import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { Place, ItineraryDay } from "../../../reducers/interfaces";
import TextField from "@material-ui/core/TextField";

import { DaySelector } from "./daySelector";
import { RootState } from "../../../reducers";
import {
  updatePlaces,
  updateCurrentPlace,
} from "../../../actions/placesActions";
import { LocationsAutoComplete } from "./locationsAutoComplete";
import { TogglePlaceType } from "./togglePlaceType";
import { updateItinerary } from "../../../actions/itineraryActions";

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export function AddPlace(props: any) {
  const [placeType, setPlaceType] = useState<string>("place");
  const [placeName, setPlaceName] = useState<string>("");
  const [position, setPosition] = useState<any>({
    lag: null,
    loc: null,
  });
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const itinerary = useSelector((state: RootState) => state.itinerary);

  const dispatch = useDispatch();

  const places = itinerary.places;
  const myItinerary = itinerary.myItinerary;

  const { handleClose } = props;
  const classes = useStyles();

  const updateMyItinerary = (newPlace: Place) => {
    const dayName = newPlace.day;

    // shallow copy
    let updatedItinerary: ItineraryDay[] = [...myItinerary];

    if (updatedItinerary.length === 0) {
      const firstDay: ItineraryDay = {
        dayName: dayName,
        places: [newPlace],
      };
      updatedItinerary.push(firstDay);
    } else {
      // get the relevant day from the itinerary
      let dayItinerary: ItineraryDay = updatedItinerary.filter(
        (item: ItineraryDay) => item.dayName === dayName
      )[0];

      // remove the old day from my itinerary
      updatedItinerary = updatedItinerary.filter(
        (item: ItineraryDay) => item.dayName !== dayName
      );

      dayItinerary.places.push(newPlace);

      // add the new day to the itinerary
      updatedItinerary.push(dayItinerary);
    }
    dispatch(updateItinerary(updatedItinerary));
  };

  const addNewPlaceToPlaces = () => {
    const newPlace: Place = {
      id: new Date().getTime(),
      name: placeName,
      sleeping: placeType === "hotel",
      day: selectedDay,
      position: position,
      description: description,
      web: website,
      media: "https://d.newsweek.com/en/full/1561143/amsterdam.jpg",
    };

    dispatch(updateCurrentPlace(newPlace));

    const newPlaces = places.concat(newPlace);
    dispatch(updatePlaces(newPlaces));
    updateMyItinerary(newPlace);
    handleClose();
  };

  const handlePlaceType = (newPlaceType: string) => {
    setPlaceType(newPlaceType);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add a Place
        </DialogTitle>
        <DialogContent>
          {/* hotel or place */}
          <form className={classes.root}>
            <TogglePlaceType
              inputPlace={"place"}
              handlePlaceType={(placeType: string) =>
                handlePlaceType(placeType)
              }
            />
          </form>

          {/* day selector */}
          <DaySelector selectDay={(day: string) => setSelectedDay(day)} />

          {/* place selector */}
          <form className={classes.root} noValidate autoComplete="off">
            <LocationsAutoComplete
              setPlaceName={(name: string) => setPlaceName(name)}
              setPosition={(p: any) => setPosition(p)}
            />
          </form>

          {/* description */}
          <form className={classes.root} noValidate autoComplete="off">
            <TextareaAutosize
              rowsMax={4}
              aria-label="maximum height"
              placeholder="Enter desription here..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>

          {/* website */}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Web-site"
              variant="outlined"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={addNewPlaceToPlaces}
            color="primary"
            disabled={placeName === ""}
          >
            Add Place
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
