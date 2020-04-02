import React from "react";
import { connect } from 'react-redux';

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
import AddLocationIcon from "@material-ui/icons/AddLocation";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { Place } from "../../../reducers/interfaces";
import { updatePlaces } from "../../../actions/placesActions";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { AddPlace } from "./addPlaceDialog";

const classes = require("./placesList.scss");

export interface PlacesListStoreProps {
  places: Place[];
}

export interface PlacesListDispatchProps {
  handleUpdatePlaces: (places: Place[]) => void;
}

export interface PlacesListOwnProps { }

export type PlacesListProps =
  PlacesListStoreProps
  & PlacesListDispatchProps
  & PlacesListOwnProps;

export interface PlacesListState {
  currentDay: string | undefined;
  showAddPlaceDialog: boolean;
}

export class PlacesListInternal extends React.Component<
  PlacesListProps,
  PlacesListState
  > {
  constructor(props: PlacesListProps, state: PlacesListState) {
    super(props, state);
    this.state = {
      currentDay: "",
      showAddPlaceDialog: false,
    };
  }

  handleDeletePlace = (id: number) => {
    const { places, handleUpdatePlaces } = this.props;
    const filteredPlaces = places.filter(item => item.id !== id);
    
    handleUpdatePlaces(filteredPlaces);
  }

  handleUpdateCurrentDay = (currentDay: string | undefined) => {
    this.setState({ currentDay });
  }

  handleAddPlace = () => {
    this.setState({ showAddPlaceDialog: true });
    // const { places, handleUpdatePlaces } = this.props;
    
    // const newPlace: Place = {
    //   id: places.length + 1,
    //   name: "New York",
    //   sleeping: false,
    //   day: "day 5",
    //   position: {
    //     lag: 50.5,
    //     loc: -30.0
    // }};

    // const newPlaces = places.concat(newPlace);
    // handleUpdatePlaces(newPlaces);

    // console.log(this.props.places);
  }

  handleCloseAddPlaceDialog = () => {
    this.setState({ showAddPlaceDialog: false });
  }


  renderPlacesList = (places: Place[]) => {
    return (
      <div className={classes.root}>
        <List component="nav">
          {places.map((item: Place, index: number) => {
            let icon = <PlaceIcon />;
            if (item.sleeping) {
              icon = <HotelIcon />;
            }
            // let divider: boolean;
            // if (item.day === this.state.currentDay) {
            //   divider = false;
            // } else { 
            //   divider = true;
            //   this.handleUpdateCurrentDay(item.day);
            // }

            return (
              <ListItem button key={index}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => console.log("clicked on edit")}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => this.handleDeletePlace(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                {/* { true && <Divider /> } */}
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  render() {
    const { places } = this.props;
    console.log(places);
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" style={{ marginTop: "20px", justifyItems: "center" }}>
          <span>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddLocationIcon />}
            onClick={this.handleAddPlace}
            style={{marginRight: "10px"}}
          >
            Add Place
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<FlightTakeoffIcon />}
            onClick={this.handleAddPlace}
          >
            Complete Itinerary
          </Button>
          </span>
          {this.renderPlacesList(places)}
          {this.state.showAddPlaceDialog && <AddPlace handleClose={this.handleCloseAddPlaceDialog}/>}
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
    handleUpdatePlaces: (s: Place[]) => dispatch(updatePlaces(s)),
  };
}

export const PlacesList =
  connect<PlacesListStoreProps, PlacesListDispatchProps, PlacesListOwnProps>(mapStateToProps, mapActionToProps)(PlacesListInternal);