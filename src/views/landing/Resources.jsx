import React, { useEffect, useState } from "react";
import Navbar from "../../components/Landing/Navbar";
import ResourceGoogleMaps from "./../../components/ResourceGoogleMap";
import ToggleButton from "./../../components/ToggleButton";

const shelters = [
  {
    name: "Name",
    url: "https://www.google.com",
    description: "This is a description of this nonprofit.",
    coords: { lat: 40.0583, lng: -74.4057 },
  },
];

const nonprofits = [
  {
    name: "Name",
    url: "https://www.google.com",
    description: "This is a description of this nonprofit.",
    coords: { lat: 40.2775319, lng: -75.37618379 },
  },
];

function Resources(props) {
  const [filter, setFilter] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!filter) setLocations([...shelters, ...nonprofits]);
    else if (filter === "nonprofits") setLocations([...nonprofits]);
    else if (filter === "shelters") setLocations([...shelters]);
  }, [filter]);

  return (
    <div className="landing resources">
      <Navbar className="navbar-light" />
      <div className="container-sm">
        <h1>Resource Locator</h1>
        <ResourceGoogleMaps markers={locations} />
        <h3>Filters</h3>
        <ToggleButton
          label="all"
          setActive={() => setFilter(false)}
          active={!filter}
        />
        <ToggleButton
          label="homeless shelters"
          setActive={() => setFilter("shelters")}
          active={filter === "shelters"}
        />
        <ToggleButton
          label="nonprofits"
          setActive={() => setFilter("nonprofits")}
          active={filter === "nonprofits"}
        />
      </div>
    </div>
  );
}

export default Resources;
