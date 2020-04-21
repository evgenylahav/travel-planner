import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Tooltip,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import Main from "./main";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ListIcon from "@material-ui/icons/List";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import AddTrip from "../components/pages/itinerary/addTrip";
import { updateItineraryFromServer } from "../actions/itineraryActions";
import { updateCurrentTrip } from "../actions/tripsActons";
import TripSelector from "../components/pages/itinerary/tripSelector";
import { SaveItineraryRequest } from "../reducers/interfaces";
import { RootState } from "../reducers";
import { updateCurrentDay } from "../actions/daysActions";
import { updateCurrentPlace } from "../actions/placesActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: 55,
      },
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export default function HeaderNew() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showAddNewTrip, setShowAddNewTrip] = useState(false);
  const [allTrips, setAllTrips] = useState({ tripNames: [] });
  const [showAllTrips, setShowAllTrips] = useState(false);

  const dispatch = useDispatch();

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const myItinerary = itinerary.myItinerary;
  const currentTrip = itinerary.currentTrip;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const topIcons = [<AddIcon />, <EditIcon />];
  const topMenu = ["Create a New Trip", "Edit Trip Name"];

  const bottomIcons = [<FolderOpenIcon />, <ListIcon />, <SaveIcon />];
  const bottomMenu = [
    "Load Last Trip",
    "Load Trip from List",
    "Save Trip to DB",
  ];

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    text: string
  ) => {
    console.log(text);
    switch (text) {
      case "Create a New Trip":
        setShowAddNewTrip(true);
        handleDrawerClose();
        break;
      case "Load Last Trip":
        handleLoadLast();
        handleDrawerClose();
        break;
      case "Load Trip from List":
        handleGetAllTripsNamesFromDatabase();
        handleDrawerClose();
        break;
      case "Save Trip to DB":
        handleSaveTripToDB();
        handleDrawerClose();
        break;
    }
  };

  const handleCloseAddNewTrip = () => {
    setShowAddNewTrip(false);
  };

  const handleCloseAllTrips = () => {
    setShowAllTrips(false);
  };

  const handleLoadLast = () => {
    fetch("/load_last_trip")
      .then((res: any) => res.json())
      .then((updatedItinerary: any) => {
        dispatch(updateItineraryFromServer(updatedItinerary.itinerary));
        dispatch(updateCurrentTrip({ tripName: updatedItinerary.tripName }));
      });
  };

  const handleGetAllTripsNamesFromDatabase = () => {
    fetch("/get_all_trip_names")
      .then((res: any) => res.json())
      .then((data) => {
        data.tripNames.unshift("");
        setAllTrips(data);
        setShowAllTrips(true);
      });
  };

  const handleSaveTripToDB = () => {
    const saveReq: SaveItineraryRequest = {
      timestamp: Date.now(),
      tripName: currentTrip.tripName,
      itinerary: myItinerary,
    };
    fetch("/update_my_itinerary", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveReq),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Travel Planner
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {topMenu.map((text, index) => (
            <Tooltip title={text}>
              <ListItem
                button
                key={text}
                onClick={(event) => handleClick(event, text)}
              >
                <ListItemIcon>{topIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          {bottomMenu.map((text, index) => (
            <Tooltip title={text}>
              <ListItem
                button
                key={text}
                onClick={(event) => handleClick(event, text)}
              >
                <ListItemIcon>{bottomIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Main />
      </main>

      {/* Add new trip */}
      {showAddNewTrip && <AddTrip close={handleCloseAddNewTrip} />}

      {/* Show all trips */}
      {showAllTrips && (
        <TripSelector trips={allTrips.tripNames} close={handleCloseAllTrips} />
      )}
    </div>
  );
}
