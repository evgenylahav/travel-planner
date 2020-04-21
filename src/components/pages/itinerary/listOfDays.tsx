import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Tooltip from "@material-ui/core/Tooltip";

import { ItineraryDay, Day, Place } from "../../../reducers/interfaces";
import { RootState } from "../../../reducers";
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { updateItinerary } from "../../../actions/itineraryActions";
import { updateCurrentDay, updateDays } from "../../../actions/daysActions";
import EditDay from "./editDay";
import { updateCurrentPlace } from "../../../actions/placesActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export function ListOfDays(props: any) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showEditDays, setShowEditDays] = useState(false);

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const dispatch = useDispatch();

  const myItinerary = itinerary.myItinerary;
  const days = itinerary.days;

  let dayName = "";
  if (days.length > 0) {
    dayName = days[selectedIndex].name;
  }

  const findWithAttr = (array: any, attr: any, value: any) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  };

  const onDrop = ({ removedIndex, addedIndex }: any) => {
    const newListOfDays: Day[] = arrayMove(days, removedIndex, addedIndex);
    dispatch(updateDays(newListOfDays));

    const updatedItinerary: ItineraryDay[] = myItinerary.map(
      (item: ItineraryDay) => {
        const newIndex = findWithAttr(newListOfDays, "name", item.dayName);
        return { ...item, order: newIndex };
      }
    );

    console.log(updatedItinerary);

    dispatch(updateItinerary(updatedItinerary));
  };

  const handleDeleteDay = (dayName: string) => {
    dispatch(updateDays(days.filter((item: Day) => item.name !== dayName)));

    const updatedItinerary = myItinerary.filter(
      (item: ItineraryDay) => item.dayName !== dayName
    );
    dispatch(updateItinerary(updatedItinerary));
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    day: Day
  ) => {
    setSelectedIndex(index);
    dispatch(updateCurrentDay(day));
    const itineraryDay: ItineraryDay[] = myItinerary.filter(
      (item: ItineraryDay) => item.dayName === day.name
    );
    const places: Place[] = itineraryDay[0].places;
    if (places.length > 0) {
      dispatch(updateCurrentPlace(places[0]));
    }
  };

  const handleShowEdit = () => {
    setShowEditDays(true);
  };

  const handleCloseEdit = () => {
    setShowEditDays(false);
  };

  const handleEditDayName = (newDayName: string) => {
    console.log(newDayName);
    dispatch(
      updateDays(
        days.map((item: Day, index: number) => {
          if (selectedIndex === index) {
            return { ...item, name: newDayName };
          } else {
            return item;
          }
        })
      )
    );

    const updatedItinerary = myItinerary.map(
      (item: ItineraryDay, index: number) => {
        if (selectedIndex === index) {
          return { ...item, dayName: newDayName };
        } else {
          return item;
        }
      }
    );
    dispatch(updateItinerary(updatedItinerary));
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {days.map((item: Day, index: number) => {
            return (
              <Draggable key={index}>
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

                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={handleShowEdit}
                    >
                      <Tooltip title={`click to edit ${item.name}`}>
                        <EditIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteDay(item.name)}
                    >
                      <Tooltip title={`click to delete ${item.name}`}>
                        <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            );
          })}
        </Container>
      </List>
      <EditDay
        show={showEditDays}
        close={handleCloseEdit}
        dayName={dayName}
        updateDayName={(s: string) => handleEditDayName(s)}
      />
    </div>
  );
}
