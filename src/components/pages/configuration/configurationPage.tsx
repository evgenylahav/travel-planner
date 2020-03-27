import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  tripType,
  tripLength,
  participants
} from "../../../resources/constants";

import { getSteps, getStepContent } from "./utils";

const classes = require("./configurationPage.scss");

export interface ConfigurationProps {}

export interface ConfigurationState {
  activeStep: number;
  participants: string;
  tripType: string;
  tripLength: string;
  timeUnits: string;
}

export class Configuration extends React.Component<
  ConfigurationProps,
  ConfigurationState
> {
  constructor(props: ConfigurationProps, state: ConfigurationState) {
    super(props, state);
    this.state = {
      activeStep: 0,
      participants: "",
      tripType: "",
      tripLength: "",
      timeUnits: "",
    };
  }

  getStepMenu = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div style={{ marginBottom: "10px" }}>
            <Autocomplete
              id="combo-box-demo"
              options={participants}
              getOptionLabel={option => option.value}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Participants"
                  variant="outlined"
                />
              )}
              onChange={ (e: any, v: any, r: any) => this.setState({ participants: v.value }) }
            />
          </div>
        );
      case 1:
        return (
          <div style={{ marginBottom: "10px" }}>
            <Autocomplete
              id="combo-box-demo"
              options={tripType}
              getOptionLabel={option => option.value}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Trip type" variant="outlined" />
              )}
              onChange={ (e: any, v: any, r: any) => this.setState({ tripType: v.value }) }
            />
          </div>
        );
      case 2:
        return (
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <TextField
              id="standard-number"
              label="Trip Length"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              style={{ marginRight: "10px" }}
              onChange={ (e: any) => this.setState({ tripLength: e.target.value + " " + this.state.timeUnits }) }
            />
            <Autocomplete
              id="combo-box-demo"
              options={tripLength}
              getOptionLabel={option => option.value}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Days / Weeks"
                  variant="outlined"
                />
              )}
              onChange={ (e: any, v: any, r: any) => this.setState({ timeUnits: v.value }) }
            />
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  findTrip = () => {
      const req = {
          participants: this.state.participants,
          tripType: this.state.tripType,
          tripLength: this.state.tripLength,
      };
      console.log(req);
  }

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
                {this.getStepMenu(index)}
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
            <Button onClick={this.findTrip} className={classes.button} variant="contained" color="primary">
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
