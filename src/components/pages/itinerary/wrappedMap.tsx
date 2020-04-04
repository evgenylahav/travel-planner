import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow
} from 'react-google-maps';
import * as locationsData from "./locations.json";

type MapProps = {
  children?: React.ReactNode,
  googleMapURL: string,

};

const Map = (props: MapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // const showInfoWindow: boolean = selectedLocation.name !== "";

  // console.log(selectedLocation);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      {locationsData.features.map((location: any) => (
        <Marker
          key={location.properties.PARK_ID}
          position={{
            lat: location.geometry.coordinates[1],
            lng: location.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedLocation(location);
          }}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
          position={{
            lat: selectedLocation?.geometry?.coordinates[1],
            lng: selectedLocation?.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedLocation.properties.NAME}</h2>
            <p>{selectedLocation.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}

    </GoogleMap>
  );
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
