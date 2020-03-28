import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const classes = require("./landingPage.scss");

export interface LandingProps {}

export interface LandingState {}

export class Landing extends React.Component<LandingProps, LandingState> {
  constructor(props: LandingProps, state: LandingState) {
    super(props, state);
    this.state = {};
  }

  render() {
    return (
      <div className={classes.root}>
        <Button
          component={Link}
          to="/configuration"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Guided
        </Button>
        <Button
          component={Link}
          to="/new/location/"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Manual
        </Button>
      </div>
    );
  }
}
