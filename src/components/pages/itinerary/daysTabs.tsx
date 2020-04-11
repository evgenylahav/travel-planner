import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Day, Place, ItineraryDay } from "../../../reducers/interfaces";
import { ListOfPlaces } from "./listOfPlaces";
import { RootState } from "../../../reducers";
import { updateDays } from "../../../actions/daysActions";
import { updateCurrentPlace } from "../../../actions/placesActions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "-webkit-fill-available" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "90%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
  },
}));

export function DaysTabs() {
  const classes = useStyles();

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const dispatch = useDispatch();

  const days = itinerary.days;
  const myItinerary = itinerary.myItinerary;

  const [dayValue, setDayValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}> | null,
    newDayValue: number
  ) => {
    setDayValue(newDayValue);

    const selectedDay = days[newDayValue];

    const itineraryDay = myItinerary.filter(
      (item: ItineraryDay) => item.dayName === selectedDay.name
    );

    console.log(myItinerary);
    console.log(itineraryDay);

    const place = itineraryDay[0].places[0];
    dispatch(updateCurrentPlace(place));
  };

  const removeDay = (dayName: string) => {
    handleChange(null, 0);
    const newDays = days.filter((item: Day) => item.name !== dayName);
    dispatch(updateDays(newDays));
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={dayValue}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {days.map((item: Day, index: number) => {
          return (
            <Tab
              {...a11yProps(index)}
              key={index}
              component="div"
              label={
                <div>
                  <Tooltip title="Remove day">
                    <IconButton
                      onClick={() => {
                        removeDay(item.name);
                      }}
                    >
                      <RemoveCircleOutlineSharpIcon
                        fontSize="small"
                        color="secondary"
                      />
                    </IconButton>
                  </Tooltip>
                  {item.name}
                </div>
              }
            />
          );
        })}
      </Tabs>
      <TabPanel value={dayValue} index={dayValue}>
        <ListOfPlaces day={days[dayValue] ? days[dayValue].name : ""} />
      </TabPanel>
    </div>
  );
}
