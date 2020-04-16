import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LanguageIcon from "@material-ui/icons/Language";
import Tooltip from "@material-ui/core/Tooltip";

import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Place, ItineraryDay } from "../../../reducers/interfaces";
import { RootState } from "../../../reducers";
import {
  updatePlaces,
  updateCurrentPlace,
  updateFilteredPlaces,
} from "../../../actions/placesActions";
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { updateItinerary } from "../../../actions/itineraryActions";
import EditPlace from "./editPlace";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export function ListOfPlaces() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const itinerary = useSelector((state: RootState) => state.itinerary);

  const dispatch = useDispatch();

  const myItinerary = itinerary.myItinerary;
  const currentDay = itinerary.currentDay;

  console.log(currentDay);

  const day = currentDay ? currentDay.name : null;

  const selectedDay: ItineraryDay = myItinerary.filter(
    (item: ItineraryDay) => item.dayName === day
  )[0];

  let selectedPlaces: Place[];

  if (selectedDay === undefined) {
    selectedPlaces = [];
  } else {
    selectedPlaces = selectedDay.places;
  }

  console.log(selectedPlaces);

  const [showEditPlaceCard, setShowEditPlaceCard] = useState(
    selectedPlaces.map((item: Place) => false)
  );

  const onDrop = ({ removedIndex, addedIndex }: any) => {
    const newListOfPlaces = arrayMove(selectedPlaces, removedIndex, addedIndex);
    console.log(newListOfPlaces);

    let dayItinerary: ItineraryDay = selectedDay;

    dayItinerary.places = newListOfPlaces;

    let updatedItinerary: ItineraryDay[] = myItinerary;

    // remove the old day from my itinerary
    updatedItinerary = updatedItinerary.filter(
      (item: ItineraryDay) => item.dayName !== day
    );

    // add the new day to the itinerary
    updatedItinerary.push(dayItinerary);

    dispatch(updateItinerary(updatedItinerary));
  };

  const handleDeletePlace = (id: number) => {
    dispatch(
      updatePlaces(selectedPlaces.filter((item: Place) => item.id !== id))
    );

    let dayItinerary: ItineraryDay = selectedDay;
    const filteredPlaces: Place[] = dayItinerary.places.filter(
      (item: Place) => item.id !== id
    );
    dayItinerary.places = filteredPlaces;

    let updatedItinerary: ItineraryDay[] = myItinerary;

    // remove the old day from my itinerary
    updatedItinerary = updatedItinerary.filter(
      (item: ItineraryDay) => item.dayName !== day
    );

    // add the new day to the itinerary
    updatedItinerary.push(dayItinerary);

    dispatch(updateItinerary(updatedItinerary));
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    place: Place
  ) => {
    setSelectedIndex(index);
    dispatch(updateCurrentPlace(place));
  };

  const showPlaceCard = (index: number) => {
    let values = selectedPlaces.map((item) => false);
    values[index] = true;
    setShowEditPlaceCard(values);
  };

  const closeEditPlace = (index: number) => {
    let values = selectedPlaces.map((item) => false);
    setShowEditPlaceCard(values);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {selectedPlaces.map((item: Place, index: number) => {
            let icon = <PlaceIcon />;
            if (item.sleeping) {
              icon = <HotelIcon />;
            }

            return (
              <Draggable key={index}>
                <Tooltip title={item.description}>
                  <ListItem
                    button
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index, item)}
                  >
                    <ListItemIcon className="drag-handle">
                      <Tooltip title={`use to re-order ${item.name}`}>
                        <DragHandleIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <Tooltip title={item.sleeping ? "Sleeping" : "Visiting"}>
                      <ListItemIcon>{icon}</ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="web"
                        onClick={() => window.open(item.web, "_blank")}
                        disabled={item.web === ""}
                      >
                        <Tooltip title={item.web}>
                          <LanguageIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => showPlaceCard(index)}
                      >
                        <Tooltip title={`click to edit ${item.name}`}>
                          <EditIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeletePlace(item.id)}
                      >
                        <Tooltip title={`click to delete ${item.name}`}>
                          <DeleteIcon />
                        </Tooltip>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Tooltip>
                {showEditPlaceCard[index] && (
                  <EditPlace
                    place={item}
                    close={(index: number) => closeEditPlace(index)}
                  />
                )}
              </Draggable>
            );
          })}
        </Container>
      </List>
    </div>
  );
}
