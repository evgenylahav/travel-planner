import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

export function InputPlaceTxt(props: any) {
  const classes = useStyles();
  const [placeValue, setPlaceValue] = useState("");
  const { setPlaceName } = props;

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter a destination"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => setPlaceValue(e.target.value)}
      />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions"
        onClick={setPlaceName(placeValue)}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
