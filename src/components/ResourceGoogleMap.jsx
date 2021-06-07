import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function ResourceGoogleMaps({ markers = [], zoom = 10 }) {
  const [google, setGoogle] = useState(false);
  const [info, setInfo] = useState(false);

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
          center={{ lat: 40.74485, lng: -74.023957 }}
          zoom={zoom}
          options={options}
        >
          {markers.map((marker, index) => {
            return marker.coords ? (
              <Marker
                key={marker.url}
                position={marker.coords}
                onMouseOver={() => setInfo(index)}
              >
                {index === info && (
                  <InfoWindow
                    options={{ maxWidth: 300 }}
                    onCloseClick={() => setInfo(false)}
                  >
                    <>
                      <h5>{marker.name}</h5>
                      <p>{marker.description}</p>
                      <p>{marker.address}</p>
                      <a href={marker.url} target="_blank" rel="noopener">
                        {marker.url}
                      </a>
                    </>
                  </InfoWindow>
                )}
              </Marker>
            ) : null;
          })}
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
