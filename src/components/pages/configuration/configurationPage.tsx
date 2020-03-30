import React from "react";
import { Link } from "react-router-dom";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// import { RootState } from '../../../reducers';

import { getSteps, getStepContent, getStepMenu } from "./configurationUtils";

import { connect } from 'react-redux';
import { updateConfigurationRequest } from '../../../actions/configActions';
import { ConfigurationRequest } from "../../../reducers/interfaces";

const classes = require("./configurationPage.scss");

export interface ConfigurationStoreProps {
  request: ConfigurationRequest;
}

export interface ConfigurationDispatchProps {
  handleUpdateConfigurationRequest: (request: ConfigurationRequest) => void;
}

export interface ConfigurationOwnProps { }

export type ConfigurationProps =
  ConfigurationStoreProps
  & ConfigurationDispatchProps
  & ConfigurationOwnProps;

export interface ConfigurationState {
  activeStep: number;
  timeUnits: string;
}

class ConfigurationInternal extends React.Component<
  ConfigurationProps,
  ConfigurationState
  > {
  constructor(props: ConfigurationProps, state: ConfigurationState) {
    super(props, state);
    this.state = {
      activeStep: 0,
      timeUnits: "days"
    };
  }

  handleUpdateTimeUnits = (timeUnits: string) => {
    this.setState({ timeUnits: timeUnits });
  } 

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
    this.props.handleUpdateConfigurationRequest({
      participants: "",
      tripType: "",
      tripLength: 0
    });
  };

  findTrip = () => {
    const request = {
      participants: this.props.request.participants,
      tripType: this.props.request.tripType,
      tripLength: this.props.request.tripLength
    };
    console.log(request);
  };

  render() {
    const { activeStep } = this.state;
    const steps = getSteps();
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography
                  className={classes.typography}
                  style={{ marginBottom: "10px" }}
                >
                  {getStepContent(index)}
                </Typography>
                {getStepMenu(index, this.state.timeUnits, (s: string) => this.handleUpdateTimeUnits, this.props)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography style={{ marginBottom: "10px" }}>
              All steps completed - you&apos;re finished. Let&apos;s find a trip
              for you.
            </Typography>
            <Button
              component={Link}
              to="/itinerary"
              onClick={this.findTrip}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Find me a Trip
            </Button>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any): ConfigurationStoreProps {
  const configState = state.config;
  return {
    request: configState.request,
  };
}

function mapActionToProps(dispatch: any) {
  return {
    handleUpdateConfigurationRequest: (s: ConfigurationRequest) => dispatch(updateConfigurationRequest(s)),
  };
}

export const Configuration =
  connect<ConfigurationStoreProps, ConfigurationDispatchProps, ConfigurationOwnProps>(mapStateToProps, mapActionToProps)(ConfigurationInternal);