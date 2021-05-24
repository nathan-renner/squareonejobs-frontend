/* global google */
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function GoogleMaps({
  coords = { lat: 40.74691, lng: -74.025787 },
  marker = true,
  className = false,
  zoom = 11,
}) {
  const [google, setGoogle] = useState(false);

  useEffect(() => {
    !google && setGoogle(window.google);
    // eslint-disable-next-line
  }, [window.google]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const options = {
    fullscreenControls: true,
    fullscreenControlOptions: {
      position: google && google.maps.ControlPosition.LEFT_TOP,
    },
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={className ? className : "map"}
          center={coords}
          zoom={zoom}
          options={options}
        >
          {marker && <Marker position={coords} />}
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <div className="map">Loading map...</div>
      )}
    </>
  );
}

export default GoogleMaps;
