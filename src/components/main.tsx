import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Router, useHistory } from "react-router-dom";
import Configuration from "./pages/configuration/configurationPage";
import Landing from "./pages/landing/landingPage";
import Itinerary from "./pages/itinerary/itineraryPage";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import { getSessionCookie, SessionContext } from "./session";
import { createBrowserHistory } from "history";

export default function Main() {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    const cookie = getSessionCookie();
    console.log(session);
    console.log(cookie);
    // console.log(session.user.email === cookie.user.email);
    if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
      console.log("cookie is empty");
      // setSession(cookie);
    } else if (session.user.email !== cookie.user.email) {
      console.log("session is not equal to cookie");
      setSession(cookie);
    }
  }, [session]);

  const history = createBrowserHistory();
  // const session = useContext(SessionContext);

  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <Switch>
          {/* <Route exact path="/" component={LandingPageNew} /> */}
          <Route path="/configuration" component={Configuration} />
          <Route path="/itinerary" component={Itinerary} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}
