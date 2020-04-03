import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Place, Day } from '../../../reducers/interfaces';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";
import AddIcon from "@material-ui/icons/Add";
import { InputPlaceTxt } from './inputPlaceTxt';
import { DaySelector } from './daySelector';
import { RootState } from '../../../reducers';
import { updatePlaces } from '../../../actions/placesActions';
import { updateDays } from '../../../actions/daysActions';

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
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
  const [placeType, setPlaceType] = useState<string | null>('place');
  const [placeName, setPlaceName] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  const itinerary = useSelector((state: RootState) => state.itinerary);

  const dispatch = useDispatch();

  const places = itinerary.places;
  const days = itinerary.days;

  const { handleClose } = props;
  const classes = useStyles();

  const addNewPlaceToPlaces = () => {
    const newPlace: Place = {
      id: new Date().getTime(),
      name: placeName,
      sleeping: placeType === "hotel",
      day: selectedDay,
      position: {
        lag: 50.5,
        loc: -30.0
      }
    };

    const newPlaces = places.concat(newPlace);
    dispatch(updatePlaces(newPlaces));
    handleClose();
  }

  const handlePlaceType = (event: React.MouseEvent<HTMLElement>, newPlaceType: string | null) => {
    setPlaceType(newPlaceType);
  };

  const updateADay = (day: string) => {
    setSelectedDay(day);
  }

  const handleAddANewDay = () => {
    dispatch(updateDays(days));
  }

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
          <span>
            <DaySelector selectDay={(day: string) => updateADay(day)} />
            <Button
              variant="contained"
              color="default"
              startIcon={<AddIcon />}
              onClick={handleAddANewDay}
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              Add A New Day
            </Button>
          </span>

          {/* <InputPlaceTxt setPlaceName={(name: string) => setPlaceName(name)}/> */}
          <GoogleMaps setPlaceName={(name: string) => setPlaceName(name)} />
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