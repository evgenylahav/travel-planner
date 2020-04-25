import React from "react";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Drawer,
  Tooltip,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ListIcon from "@material-ui/icons/List";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default function ActionsDrawer(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const {
    open,
    handleDrawerClose,
    handleSaveTripToDB,
    setShowAddNewTrip,
    handleLoadLast,
    handleGetAllTripsNamesFromDatabase,
  } = props;

  const topIcons = [<EmojiPeopleIcon />, <AddIcon />, <EditIcon />];
  const topMenu = [
    "Create a New Guided Trip",
    "Create a New Trip",
    "Edit Trip Name",
  ];

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
      case "Create a New Guided Trip":
        history.push("/configuration");
        handleDrawerClose();
        break;
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

  return (
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
  );
}
