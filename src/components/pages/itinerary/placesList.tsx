import React from "react";
import { connect } from 'react-redux';

// import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";
import AddIcon from "@material-ui/icons/Add";
import { Places } from "../../../reducers/interfaces";
import { updatePlaces } from "../../../actions/placesActions";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";

const classes = require("./placesList.scss");

export interface PlacesListStoreProps {
  places: Places[];
}

export interface PlacesListDispatchProps {
  handleUpdatePlaces: (places: Places[]) => void;
}

export interface PlacesListOwnProps { }

export type PlacesListProps =
PlacesListStoreProps
  & PlacesListDispatchProps
  & PlacesListOwnProps;

export interface PlacesListState {}

export class PlacesListInternal extends React.Component<
  PlacesListProps,
  PlacesListState
> {
  constructor(props: PlacesListProps, state: PlacesListState) {
    super(props, state);
    this.state = {};
  }

  // onDrop = ({ removedIndex, addedIndex }) => {
  //   setItems(items => arrayMove(items, removedIndex, addedIndex));
  // };

  render() {
    const { places } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add Place
          </Button>
          <div className={classes.root}>
            <List component="nav">
              { places.map((item: Places, id: number) => {
                let icon = <PlaceIcon />;
                if (item.sleeping) {
                  icon = <HotelIcon />;
                }
                return(
                  // <Draggable key={id}>
                <ListItem button>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
              // </Draggable>
                );
              }) }
            </List>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any): PlacesListStoreProps {
  const itineraryState = state.itinerary;
  return {
    places: itineraryState.places,
  };
}

function mapActionToProps(dispatch: any) {
  return {
    handleUpdatePlaces: (s: Places[]) => dispatch(updatePlaces(s)),
  };
}

export const PlacesList =
  connect<PlacesListStoreProps, PlacesListDispatchProps, PlacesListOwnProps>(mapStateToProps, mapActionToProps)(PlacesListInternal);