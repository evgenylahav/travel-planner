import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Day } from '../../../reducers/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

export function DaySelector(props: any) {
  const classes = useStyles();
  const { selectDay } = props;

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const days = itinerary.days;

  let initDay = undefined;
  if (days.length > 0){
    initDay = days[0].name;
  }

  const [currentDay, setCurrentDay] = React.useState(initDay);
  selectDay(currentDay);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const day: string = event.target.value;
    setCurrentDay(day);
    selectDay(day)
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-select-day"
          select
          label="Select a day"
          value={currentDay}
          onChange={handleChange}
          variant="outlined"
        >
          {days.map((item: Day) => {
            return (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
    </form>
  );
}
