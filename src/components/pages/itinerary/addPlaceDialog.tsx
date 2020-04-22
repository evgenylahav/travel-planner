import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Tooltip,
  TextareaAutosize,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@material-ui/core";

import Draggable from "react-draggable";
import { Place, ItineraryDay } from "../../../reducers/interfaces";
import { DaySelector } from "./daySelector";
import { RootState } from "../../../reducers";
import {
  updatePlaces,
  updateCurrentPlace,
} from "../../../actions/placesActions";
import { LocationsAutoComplete } from "./locationsAutoComplete";
import { TogglePlaceType } from "./togglePlaceType";
import { updateItinerary } from "../../../actions/itineraryActions";

import { WrappedMap } from "./wrappedMap";

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
  layout: {
    display: "grid",
    gridTemplateColumns: "2fr 5fr",
  },
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
        order: 0,
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
          <div className={classes.layout}>
            {/* Forms */}
            <div>
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
                <TextField
                  id="outlined-multiline-flexible"
                  label="Place Description"
                  multiline
                  rowsMax={4}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
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
            </div>

            {/* Map */}
            <div>
              <Box component="div" m={1}>
                <div style={{ height: "90vh", width: "90vm" }}>
                  <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=
            geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </div>
              </Box>
            </div>
          </div>
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
