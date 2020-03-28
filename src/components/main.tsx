import React from "react";
import { Switch, Route } from "react-router-dom";
import { Configuration } from "./pages/configuration";
import { Landing } from "./pages/landing";
import { Itinerary } from "./pages/itinerary";

export interface MainProps {}

export class Main extends React.Component<MainProps, {}> {
  constructor(props: MainProps, state: any) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/configuration" component={Configuration} />
        <Route path="/itinerary" component={Itinerary} />
      </Switch>
    );
  }
}
