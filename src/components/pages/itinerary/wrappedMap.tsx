import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, DirectionsRenderer } from 'react-google-maps';

type MapProps = {
  children?: React.ReactNode,
  googleMapURL: string,
  
};

const Map = (props: MapProps) => {
  return (
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    />
);
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
