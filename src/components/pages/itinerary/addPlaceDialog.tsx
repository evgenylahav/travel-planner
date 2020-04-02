import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import GoogleMaps from './googleMapsAutocomplete';
import { Place } from '../../../reducers/interfaces';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";

function PaperComponent(props: any) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

export function AddPlace(props: any) {
  const [placeType, setPlaceType] = useState<string | null>('place');

  const { handleClose, handleAddPlace } = props;
  const classes = useStyles();

  const addNewPlaceToPlaces = () => {
    const newPlace: Place = {
      id: new Date().getTime(),
      name: "New York",
      sleeping: placeType === "hotel",
      day: "day 5",
      position: {
        lag: 50.5,
        loc: -30.0
      }
    };
    handleAddPlace(newPlace);
  }

  const handlePlaceType = (event: React.MouseEvent<HTMLElement>, newPlaceType: string | null) => {
    setPlaceType(newPlaceType);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add a Place
        </DialogTitle>
        <DialogContent>
        <div className={classes.toggleContainer}>
        <ToggleButtonGroup
            exclusive
            value={placeType}
            onChange={handlePlaceType}
          >
            <ToggleButton value="place">
              <PlaceIcon />
            </ToggleButton>
            <ToggleButton value="hotel">
              <HotelIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          </div>
          <GoogleMaps />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewPlaceToPlaces} color="primary">
            Add Place
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}