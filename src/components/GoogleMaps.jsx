import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function GoogleMaps({
  coords = { lat: 40.74691, lng: -74.025787 },
  marker = true,
  className = false,
  zoom = 11,
}) {
  // const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={className ? className : "map"}
          center={coords}
          zoom={zoom}
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
