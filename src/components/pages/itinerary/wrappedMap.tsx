import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { RootState } from "../../../reducers";
import { Place } from "../../../reducers/interfaces";

type MapProps = {
  children?: React.ReactNode;
  googleMapURL: string;
};

const Map = (props: MapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Place | any>(null);

  const itinerary = useSelector((state: RootState) => state.itinerary);

  const dispatch = useDispatch();

  const places = itinerary.places;
  const currentPlace = itinerary.currentPlace;

  const center = currentPlace
    ? { lat: currentPlace.position.lat, lng: currentPlace.position.lng }
    : { lat: 32.0853, lng: 34.7818 };

  return (
    <GoogleMap defaultZoom={10} center={center}>
      {places.map((place: Place, index: number) => (
        <Marker
          key={index}
          position={{
            lat: place.position.lat,
            lng: place.position.lng,
          }}
          onClick={() => {
            setSelectedLocation(place);
          }}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
          position={{
            lat: selectedLocation.position.lat,
            lng: selectedLocation.position.lng,
          }}
        >
          <div>
            <h2>{selectedLocation.name}</h2>
            <p>{selectedLocation.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export const WrappedMap = withScriptjs(withGoogleMap(Map));
