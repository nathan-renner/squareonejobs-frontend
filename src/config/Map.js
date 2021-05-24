import { useJsApiLoader } from "@react-google-maps/api";

export const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
});
