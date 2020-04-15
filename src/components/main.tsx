import React from "react";
import { Switch, Route } from "react-router-dom";
import Configuration from "./pages/configuration/configurationPage";
import Landing from "./pages/landing/landingPage";
import Itinerary from "./pages/itinerary/itineraryPage";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/configuration" component={Configuration} />
      <Route path="/itinerary" component={Itinerary} />
    </Switch>
  );
}
