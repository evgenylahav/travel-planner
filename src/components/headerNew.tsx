import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Main from "./main";
import MenuIcon from "@material-ui/icons/Menu";

import AddTrip from "../components/pages/itinerary/addTrip";
import { updateItineraryFromServer } from "../actions/itineraryActions";
import { updateCurrentTrip } from "../actions/tripsActons";
import TripSelector from "../components/pages/itinerary/tripSelector";
import { SaveItineraryRequest } from "../reducers/interfaces";
import { RootState } from "../reducers";
import { updateLoggedIn } from "../actions/authActions";
import ActionsDrawer from "./actionsDrawer";
import { SessionContext } from "./session";

const drawerWidth = 240;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [open, setOpen] = useState(false);
  const [showAddNewTrip, setShowAddNewTrip] = useState(false);
  const [allTrips, setAllTrips] = useState({ tripNames: [] });
  const [showAllTrips, setShowAllTrips] = useState(false);
  const [openSaveNotifier, setOpenSaveNotifier] = useState(false);
  const [severity, setSevirity] = useState<
    "success" | "info" | "warning" | "error" | undefined
  >("success");

  const dispatch = useDispatch();
  // let history = useHistory();
  const session = useContext(SessionContext);
  const loggedIn = session.user !== undefined;
  const user = session.user;

  const itinerary = useSelector((state: RootState) => state.itinerary);
  const myItinerary = itinerary.myItinerary;
  const currentTrip = itinerary.currentTrip;

  // const auth = useSelector((state: RootState) => state.auth);
  // const user = auth.user;
  // const loggedIn = auth.loggedIn;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseAddNewTrip = () => {
    setShowAddNewTrip(false);
  };

  const handleCloseAllTrips = () => {
    setShowAllTrips(false);
  };

  const handleCloseSaveNotifier = () => {
    setOpenSaveNotifier(false);
  };

  const handleLoadLast = () => {
    const req = { user: user };
    fetch("/load_last_trip", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res: any) => res.json())
      .then((updatedItinerary: any) => {
        dispatch(updateItineraryFromServer(updatedItinerary.itinerary));
        dispatch(updateCurrentTrip({ tripName: updatedItinerary.tripName }));
      });
  };

  const handleGetAllTripsNamesFromDatabase = () => {
    const req = { user: user };
    fetch("/get_all_trip_names", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
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
      user: user,
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
      .then((data) => {
        setOpenSaveNotifier(true);
        setSevirity(data.message);
      });
  };

  const handleSignOut = () => {
    dispatch(updateLoggedIn(false));
  };

  console.log(user);

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
            {loggedIn && <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Travel Planner
          </Typography>
          {!loggedIn && (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              style={{ marginRight: "10px" }}
            >
              Login
            </Button>
          )}
          {!loggedIn && (
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              style={{ marginRight: "10px" }}
            >
              Sign Up
            </Button>
          )}
          {loggedIn && (
            <span style={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                style={{ alignSelf: "center", marginRight: "15px" }}
              >
                {`Hello, ${user.firstName}`}
              </Typography>
              <Button
                component={Link}
                to="/logout"
                color="inherit"
                style={{ marginRight: "10px" }}
              >
                Sign Out
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
      {loggedIn && (
        <ActionsDrawer
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleSaveTripToDB={handleSaveTripToDB}
          setShowAddNewTrip={setShowAddNewTrip}
          handleLoadLast={handleLoadLast}
          handleGetAllTripsNamesFromDatabase={
            handleGetAllTripsNamesFromDatabase
          }
        />
      )}
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
      <Snackbar
        open={openSaveNotifier}
        autoHideDuration={3000}
        onClose={handleCloseSaveNotifier}
      >
        <Alert onClose={handleCloseSaveNotifier} severity={severity}>
          {severity === "success"
            ? "Trip saved successfully!"
            : "Trip save failed"}
        </Alert>
      </Snackbar>
    </div>
  );
}
