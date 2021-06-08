import React, { useEffect, useState } from "react";

import Navbar from "../../components/Landing/Navbar";
import Footer from "./../../components/Landing/Footer";
import { shelters, nonprofits, businesses } from "../../resources";

import { ToggleButton, ResourceGoogleMap } from "../../components/common";

function Resources(props) {
  const [filter, setFilter] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!filter) setLocations([...shelters, ...nonprofits]);
    else if (filter === "nonprofits") setLocations([...nonprofits]);
    else if (filter === "shelters") setLocations([...shelters]);
    else if (filter === "businesses") setLocations([...businesses]);
  }, [filter]);

  const renderListItem = (item) => (
    <div className="list-item" key={item.url}>
      <h5>{item.name}</h5>
      <div className="list-item-tooltip">
        <p>{item.description}</p>
        {item.address && <p>{item.address}</p>}
        <a href={item.url} target="_blank" rel="noreferrer">
          {item.url}
        </a>
      </div>
    </div>
  );

  return (
    <div className="landing resources">
      <Navbar className="navbar-light" fixed />
      <div className="container-sm">
        <h1>Resource Locator</h1>
        <p>
          Helping you find a job includes more than just connecting with
          employers. Find some helpful resources near you to help prepare for
          the journey ahead.
        </p>
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
        {businesses.length > 0 && (
          <ToggleButton
            label="Businesses & Orgs"
            setActive={() => setFilter("businesses")}
            active={filter === "businesses"}
          />
        )}
        <ResourceGoogleMap markers={locations} />
        <h3>Homeless Shelters</h3>
        <div className="resource-list">
          {shelters.map((shelter) => (
            <>{renderListItem(shelter)}</>
          ))}
        </div>
        <h3>Nonprofits</h3>
        <div className="resource-list">
          {nonprofits.map((nonprofit) => (
            <>{renderListItem(nonprofit)}</>
          ))}
        </div>
        {businesses.length > 0 && (
          <>
            <h3>Businesses and Other Organizations</h3>
            <div className="resource-list">
              {businesses.map((business) => (
                <>{renderListItem(business)}</>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Resources;
