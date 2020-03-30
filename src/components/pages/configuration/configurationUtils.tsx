import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  tripType,
  tripLength,
  participants
} from "../../../resources/constants";

export const getSteps = () => {
  return [
    "Who is travelling?",
    "What type of a trip do you prefer?",
    "What would be the length of your trip?"
  ];
};

export const getStepContent = (step: number) => {
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
};


export const getStepMenu = (
  step: number, 
  timeUnits: string, 
  updateTimeUnits: (s: string) => {}, 
  props: any) => {
  switch (step) {
    case 0:
      return (
        <div style={{ marginBottom: "10px" }}>
          <Autocomplete
            id="participants"
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
            onChange={(e: any, v: any) => {
              props.handleUpdateConfigurationRequest({
                ...props.request, participants: v.value
              })
            }}
          />
        </div>
      );
    case 1:
      return (
        <div style={{ marginBottom: "10px" }}>
          <Autocomplete
            id="tripType"
            options={tripType}
            getOptionLabel={option => option.value}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Trip type" variant="outlined" />
            )}
            onChange={(e: any, v: any) => {
              props.handleUpdateConfigurationRequest({
                ...props.request, tripType: v.value
              })
            }}
          />
        </div>
      );
    case 2:
      return (
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <TextField
            id="tripLength-number"
            label="Trip Length"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginRight: "10px" }}
            onChange={(e: any) => {
              const multiplier = timeUnits === "days"
                ? 1
                : 7;
              const tripLength = e.target.value * multiplier;

              props.handleUpdateConfigurationRequest({
                ...props.request, tripLength: tripLength
              })
            }}
          />
          <Autocomplete
            id="tripLength-units"
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
            onChange={(e: any, v: any) => {
              updateTimeUnits(v.value);
              const multiplier = v.value === "days"
                ? 1
                : 7;
              const tripLength = props.request.tripLength * multiplier;

              props.handleUpdateConfigurationRequest({
                ...props.request, tripLength: tripLength
              });
            }}
          />
        </div>
      );
    default:
      return "Unknown step";
  }
};