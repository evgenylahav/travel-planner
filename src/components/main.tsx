import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Configuration from "./pages/configuration/configurationPage";
import Landing from "./pages/landing/landingPage";
import Itinerary from "./pages/itinerary/itineraryPage";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import PrivateRoute from "./privateRoute";

export default function Main() {
  const auth = useSelector((state: RootState) => state.auth);
  const loggedIn = auth.loggedIn;

  console.log(loggedIn);

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <PrivateRoute
        path="/configuration"
        component={Configuration}
        authed={loggedIn}
      />
      <PrivateRoute path="/itinerary" component={Itinerary} authed={loggedIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}
