import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import AddIcon from "@material-ui/icons/Add";

const classes = require("./placesList.scss");

export interface PlacesListProps {}

export interface PlacesListState {}

export class PlacesList extends React.Component<
  PlacesListProps,
  PlacesListState
> {
  constructor(props: PlacesListProps, state: PlacesListState) {
    super(props, state);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add Place
          </Button>
          <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
