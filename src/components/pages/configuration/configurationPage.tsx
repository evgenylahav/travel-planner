import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const classes = require('./configurationPage.scss');

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return [
    "Who is travelling?",
    "What type of a trip do you prefer?",
    "What would be the length of your trip?"
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `Select the participants of your planned trip - a family with children,
              a solo traveller, a couple, group of friends, etc...`;
    case 1:
      return `Select the type of the trip you would like to have - urban, nature, 
              backpacking, skiing, etc...`;
    case 2:
      return `Select the length of your trip. Don't worry - it doesn't have to be
              exact.`;
    default:
      return "Unknown step";
  }
}

function getStepMenu(step: number) {
  switch (step) {
    case 0:
      return (
        <Autocomplete
          id="combo-box-demo"
          options={participants}
          getOptionLabel={option => option.value}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} label="Participants" variant="outlined" />
          )}
        />
      );
    case 1:
      return (
        <Autocomplete
          id="combo-box-demo"
          options={tripType}
          getOptionLabel={option => option.value}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} label="Trip type" variant="outlined" />
          )}
        />
      );
    case 2:
      return (
        <div style={{ display: "flex" }}>
          <TextField
            id="standard-number"
            label="Trip Length"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginRight: "10px" }}
          />
          <Autocomplete
            id="combo-box-demo"
            options={tripLength}
            getOptionLabel={option => option.value}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Days / Weeks" variant="outlined" />
            )}
          />
        </div>
      );
    default:
      return "Unknown step";
  }
}

export function Configuration() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              {getStepMenu(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
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
          <Typography>
            All steps completed - you&apos;re finished. Let&apos;s find a trip
            for you.
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
