import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, TextareaAutosize, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { RootState } from "../../../reducers";
import { Day, ItineraryDay, Place } from "../../../reducers/interfaces";
import { TogglePlaceType } from "./togglePlaceType";
import { updateItinerary } from "../../../actions/itineraryActions";

import { clone, cloneDeep } from "lodash";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EditPlace(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { close, place } = props;

  const [showDays, setShowDays] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showPlaceType, setShowPlaceType] = useState(false);

  const [newPlace, setNewPlace] = useState(place);

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const days = itinerary.days;
  const myItinerary = itinerary.myItinerary;

  const handleDayListClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    day: Day
  ) => {
    setShowDays(false);

    const updatedNewPlace = { ...newPlace, day: day.name };
    setNewPlace(updatedNewPlace);
  };

  const handleDescriptionChange = (value: string) => {
    const updatedNewPlace = { ...newPlace, description: value };
    setNewPlace(updatedNewPlace);
  };

  const handleWebsiteChange = (value: string) => {
    const updatedNewPlace = { ...newPlace, web: value };
    setNewPlace(updatedNewPlace);
  };

  const handlePlaceTypeChange = (value: string) => {
    const updatedNewPlace = { ...newPlace, sleeping: value === "hotel" };
    setNewPlace(updatedNewPlace);
  };

  const confirm = () => {
    // prepare new itinerary

    const temp: ItineraryDay[] = cloneDeep(myItinerary);

    let updatedItinerary: ItineraryDay[] = cloneDeep(myItinerary);

    const edittedDayIndex: number = myItinerary.findIndex(
      (item: ItineraryDay) => item.dayName === place.day
    );

    // fetch the day of the editted place
    let edittedDay: ItineraryDay = myItinerary.find(
      (item: ItineraryDay) => item.dayName === place.day
    );

    let allPlacesInEdittedDay: Place[] = edittedDay.places;

    if (newPlace.day === place.day) {
      // if the day wasn't changed - replace the place with new place
      const ind: number = allPlacesInEdittedDay.findIndex(
        (item: Place) => item.name === place.name
      );

      allPlacesInEdittedDay[ind] = newPlace;
      edittedDay.places = allPlacesInEdittedDay;
      updatedItinerary[edittedDayIndex] = edittedDay;
    } else {
      // if the day was changed - remove the place from the old day and add it to the
      // end of the new day
      allPlacesInEdittedDay = allPlacesInEdittedDay.filter(
        (item: Place) => item.day !== place.day
      );

      edittedDay.places = allPlacesInEdittedDay;
      updatedItinerary[edittedDayIndex] = edittedDay;

      let secondEdittedDay: ItineraryDay = myItinerary.find(
        (item: ItineraryDay) => item.dayName === newPlace.day
      );

      const edittedSecondDayIndex: number = myItinerary.findIndex(
        (item: ItineraryDay) => item.dayName === newPlace.day
      );

      let allPlacesInSecondEdittedDay: Place[] = secondEdittedDay.places;
      allPlacesInSecondEdittedDay.push(newPlace);

      secondEdittedDay.places = allPlacesInSecondEdittedDay;
      updatedItinerary[edittedSecondDayIndex] = edittedDay;
    }

    dispatch(updateItinerary(updatedItinerary));
    close();
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={newPlace.media}
          title={newPlace.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${newPlace.name} - ${newPlace.day}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Description: ${newPlace.description}`}
            <IconButton>
              <EditIcon
                color="primary"
                fontSize="small"
                onClick={() => setShowDescription(!showDescription)}
              />
            </IconButton>
            {showDescription && (
              <TextField
                id="outlined-multiline-flexible"
                label="Place Description"
                multiline
                rowsMax={4}
                value={newPlace.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                variant="outlined"
              />
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Day - ${newPlace.day}`}
            <IconButton>
              <EditIcon
                color="primary"
                fontSize="small"
                onClick={() => setShowDays(!showDays)}
              />
            </IconButton>
            {showDays && (
              <List component="nav" aria-label="main mailbox folders">
                {days.map((item: Day, index: number) => {
                  return (
                    <ListItem
                      key={index}
                      button
                      onClick={(event) => handleDayListClick(event, item)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Website: ${newPlace.web}`}
            <IconButton>
              <EditIcon
                color="primary"
                fontSize="small"
                onClick={() => setShowWebsite(!showWebsite)}
              />
            </IconButton>
            {showWebsite && (
              <TextField
                id="outlined-basic"
                label="Web-site"
                variant="outlined"
                value={newPlace.web}
                onChange={(e) => handleWebsiteChange(e.target.value)}
              />
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Place type: ${newPlace.sleeping ? "Sleeping" : "Visiting"}`}
            <IconButton>
              <EditIcon
                color="primary"
                fontSize="small"
                onClick={() => setShowPlaceType(!showPlaceType)}
              />
            </IconButton>
            {showPlaceType && (
              <TogglePlaceType
                inputPlace={newPlace.sleeping ? "hotel" : "place"}
                handlePlaceType={(placeType: string) =>
                  handlePlaceTypeChange(placeType)
                }
              />
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={confirm}>
          OK
        </Button>
        <Button size="small" color="primary" onClick={close}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
