import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import GoogleMaps from './googleMapsAutocomplete';
import { Place, Day } from '../../../reducers/interfaces';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';

import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";

import { DaySelector } from './daySelector';
import { RootState } from '../../../reducers';
import { updatePlaces } from '../../../actions/placesActions';

function PaperComponent(props: any) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
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
  const [placeType, setPlaceType] = useState<string>('place');
  const [placeName, setPlaceName] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

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
      },
      description: description,
      web: website,
    };

    const newPlaces = places.concat(newPlace);
    dispatch(updatePlaces(newPlaces));
    handleClose();
  }

  const handlePlaceType = (event: React.MouseEvent<HTMLElement>, newPlaceType: string) => {
    setPlaceType(newPlaceType);
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
          {/* hotel or place */}
          <div className={classes.toggleContainer}>
            <form className={classes.root} noValidate autoComplete="off">
              <ToggleButtonGroup
                exclusive
                value={placeType}
                onChange={handlePlaceType}
              >
                <Tooltip title={"Select for a regular place, such as a city, an attraction, a merket, etc..."}>
                <ToggleButton value="place">
                  <PlaceIcon />
                </ToggleButton>
                </Tooltip>
                <Tooltip title={"Select for a hotel, b&b, hostel, etc.."}>
                <ToggleButton value="hotel">
                  <HotelIcon />
                </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </form>
          </div>

          {/* day selector */}
          <DaySelector selectDay={(day: string) => setSelectedDay(day)} />

          {/* place selector */}
          <form className={classes.root} noValidate autoComplete="off">
            {/* google maps selector */}
            <TextField id="outlined-basic" label="Place Name" variant="outlined" onChange={(e) => setPlaceName(e.target.value)} />
            {/* <GoogleMaps setPlaceName={(name: string) => setPlaceName(name)} /> */}
            {/* <InputPlaceTxt setPlaceName={(name: string) => setPlaceName(name)}/> */}

            {/* description */}
            <TextareaAutosize
              rowsMax={4}
              aria-label="maximum height"
              placeholder="Enter desription here..."
              onChange={e => setDescription(e.target.value)}
            />
          </form>

          {/* website */}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Web-site" variant="outlined" onChange={(e) => setWebsite(e.target.value)} />
          </form>

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