import React, { useState, useEffect } from "react";
import { Switch, Route, Router, useHistory } from "react-router-dom";
import Configuration from "./pages/configuration/configurationPage";
import Landing from "./pages/landing/landingPage";
import Itinerary from "./pages/itinerary/itineraryPage";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import PrivateRoute from "./privateRoute";
import { Logout } from "./pages/auth/logout";
import { getSessionCookie, SessionContext } from "./session";

export default function Main() {
  // const auth = useSelector((state: RootState) => state.auth);
  // const loggedIn = auth.loggedIn;

  const [session, setSession] = useState(getSessionCookie());
  // useEffect(() => {
  //   setSession(getSessionCookie());
  // }, [session]);

  const history = useHistory();

  // const session = useContext(SessionContext);
  // const authed = session.user === undefined;

  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/configuration" component={Configuration} />
          {/* <PrivateRoute
        path="/configuration"
        component={Configuration}
        authed={authed}
      /> */}
          <Route path="/itinerary" component={Itinerary} />
          {/* <PrivateRoute path="/itinerary" component={Itinerary} authed={authed} /> */}
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}
