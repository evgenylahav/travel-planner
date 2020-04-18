import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  tripType,
  tripLength,
  participants,
} from "../../../resources/constants";
import { ConfigurationRequest } from "../../../reducers/interfaces";

export const getSteps = () => {
  return [
    "Who is travelling?",
    "What type of a trip do you prefer?",
    "What would be the length of your trip?",
    "Name your trip",
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
    case 3:
      return `Give your trip a name. You can always change it later.`;
    default:
      return "Unknown step";
  }
};

export const getStepMenu = (
  step: number,
  timeUnits: string,
  updateTimeUnits: any,
  configRequest: ConfigurationRequest,
  updateConfigurationRequest: any
) => {
  switch (step) {
    case 0:
      return (
        <div style={{ marginBottom: "10px" }}>
          <Autocomplete
            id="participants"
            options={participants}
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Participants" variant="outlined" />
            )}
            onChange={(e: any, v: any) => {
              updateConfigurationRequest({
                ...configRequest,
                participants: v.value,
              });
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
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Trip type" variant="outlined" />
            )}
            onChange={(e: any, v: any) => {
              updateConfigurationRequest({
                ...configRequest,
                tripType: v.value,
              });
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
              shrink: true,
            }}
            style={{ marginRight: "10px" }}
            onChange={(e: any) => {
              const multiplier = timeUnits === "days" ? 1 : 7;
              const tripLength = e.target.value * multiplier;

              updateConfigurationRequest({
                ...configRequest,
                tripLength: tripLength,
              });
            }}
          />
          <Autocomplete
            id="tripLength-units"
            options={tripLength}
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Days / Weeks" variant="outlined" />
            )}
            onChange={(e: any, v: any) => {
              updateTimeUnits(v.value);
              const multiplier = v.value === "days" ? 1 : 7;
              const tripLength = configRequest.tripLength * multiplier;
              updateConfigurationRequest({
                ...configRequest,
                tripLength: tripLength,
              });
            }}
          />
        </div>
      );
    case 3:
      return (
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <TextField
            id="trip-name"
            label="Name you trip"
            style={{ marginRight: "10px" }}
            onChange={(e: any) => {
              const tripName = e.target.value;
              console.log(tripName);

              updateConfigurationRequest({
                ...configRequest,
                tripName: tripName,
              });
            }}
          />
        </div>
      );
    default:
      return "Unknown step";
  }
};
