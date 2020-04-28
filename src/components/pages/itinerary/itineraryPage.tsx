import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ItineraryDetails } from "./itineraryDetails";
import { WrappedMap } from "./wrappedMap";
import Box from "@material-ui/core/Box";
import { SessionContext } from "../../session";

export default function Itinerary() {
  const history = useHistory();
  const session = useContext(SessionContext);
  if (session.user === undefined) {
    history.push("/login");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "3fr 4fr" }}>
      <ItineraryDetails />

      <Box component="div" m={1}>
        <div style={{ height: "90vh", width: "90vm" }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=
            geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
      </Box>
    </div>
  );
}
