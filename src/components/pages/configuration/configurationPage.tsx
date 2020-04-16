import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@material-ui/core/";

import { getSteps, getStepContent, getStepMenu } from "./configurationUtils";

import { updateConfigurationRequest } from "../../../actions/configActions";
import {
  ConfigurationRequest,
  Place,
  Day,
  ItineraryDay,
} from "../../../reducers/interfaces";
import {
  updatePlaces,
  updateCurrentPlace,
} from "../../../actions/placesActions";
import { places } from "../../../resources/constants";
import { updateDays } from "../../../actions/daysActions";
import { updateItinerary } from "../../../actions/itineraryActions";
import { RootState } from "../../../reducers";

const classes = require("./configurationPage.scss");

export default function Configuration() {
  const [activeStep, setActiveStep] = useState(0);
  const [timeUnits, setTimeUnits] = useState("days");

  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => state.config);
  const request = config.request;

  const handleUpdateTimeUnits = (timeUnits: string) => {
    setTimeUnits(timeUnits);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);

    dispatch(
      updateConfigurationRequest({
        participants: "",
        tripType: "",
        tripLength: 0,
      })
    );
  };

  const createDays = (): Day[] => {
    const allDays = new Set(places.map((item: Place) => item.day));
    const allDaysArray = Array.from(allDays);

    allDaysArray.sort();

    const days: Day[] = allDaysArray.map((item) => {
      return {
        name: item,
      };
    });

    return days;
  };

  const createMyItinerary = (): ItineraryDay[] => {
    let myItinerary: ItineraryDay[] = [];
    const days = createDays();

    days.forEach((element, index) => {
      const placesPerDay: Place[] = places.filter(
        (item: Place) => item.day === element.name
      );
      const itineraryDay: ItineraryDay = {
        order: index,
        dayName: element.name,
        places: placesPerDay,
      };
      myItinerary.push(itineraryDay);
    });
    return myItinerary;
  };

  const findTrip = () => {
    const request = {
      participants: config.request.participants,
      tripType: config.request.tripType,
      tripLength: config.request.tripLength,
    };
    dispatch(updatePlaces(places));
    dispatch(updateDays(createDays()));

    const myItinerary = createMyItinerary();

    dispatch(updateItinerary(myItinerary));

    const itineraryDay = myItinerary.filter(
      (item: ItineraryDay) => item.dayName === "Day 1"
    );

    const place = itineraryDay[0].places[0];

    dispatch(updateCurrentPlace(place));
  };

  const handleUpdateConfigurationRequest = (request: ConfigurationRequest) => {
    dispatch(updateConfigurationRequest(request));
  };

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
              {getStepMenu(
                index,
                timeUnits,
                (s: string) => handleUpdateTimeUnits,
                request,
                (r: ConfigurationRequest) => handleUpdateConfigurationRequest
              )}
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
          <Typography style={{ marginBottom: "10px" }}>
            All steps completed - you&apos;re finished. Let&apos;s find a trip
            for you.
          </Typography>
          <Button
            component={Link}
            to="/itinerary"
            onClick={findTrip}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Find me a Trip
          </Button>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
