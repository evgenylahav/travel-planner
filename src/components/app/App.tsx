import React, { useEffect, useState, Fragment, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { getSessionCookie, SessionContext } from "../session";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import { updateLoggedIn } from "../../actions/authActions";
import { createBrowserHistory } from "history";

// const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

// const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

const LandingPage = lazy(() => import("../pages/landing/landingPage"));
const Configuration = lazy(() =>
  import("../pages/configuration/configurationPage")
);
const Itinerary = lazy(() => import("../pages/itinerary/itineraryPage"));
const SignUp = lazy(() => import("../pages/auth/signup"));
const Login = lazy(() => import("../pages/auth/login"));
const Logout = lazy(() => import("../pages/auth/logout"));
const HeaderNew = lazy(() => import("../headerNew"));

export function App() {
  const dispatch = useDispatch();
  const cookie = getSessionCookie();

  useEffect(() => {
    if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
      console.log("cookie is empty");
      dispatch(updateLoggedIn(false));
    } else {
      console.log("Logged in");
      dispatch(updateLoggedIn(true));
    }
  });

  // const history = createBrowserHistory();
  // const session = useContext(SessionContext);
  return (
    <BrowserRouter>
      <Suspense fallback={<Fragment />}>
        <HeaderNew />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/configuration" component={Configuration} />
          <Route path="/itinerary" component={Itinerary} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

serviceWorker.register();

// import React from "react";
// import Main from "../main";
// import HeaderNew from "../headerNew";
// import LandingPageNew from "../pages/landing/landingPageNew";

// export function App() {
//   return (
//     <div className="App">
//       <LandingPageNew />
//       {/* <HeaderNew /> */}
//       {/* <Main /> */}
//     </div>
//   );
// }
