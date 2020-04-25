import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authed: authed,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={() =>
        authed ? <Component /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}
