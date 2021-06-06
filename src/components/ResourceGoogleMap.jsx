import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function ResourceGoogleMaps({
  markers = [],
  coords = { lat: 40.0583, lng: -74.4057 },
  zoom = 8,
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
    // fullscreenControls: true,
    // fullscreenControlOptions: {
    //   position: google && google.maps.ControlPosition.LEFT_TOP,
    // },
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="resources-map"
          center={coords}
          zoom={zoom}
          options={options}
        >
          {markers.map((marker) => (
            <Marker key={marker.name} position={marker.coords} />
          ))}
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <div className="map">Loading map...</div>
      )}
    </>
  );
}

export default ResourceGoogleMaps;
