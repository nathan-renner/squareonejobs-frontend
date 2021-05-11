import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import ActivityIndicator from "./../components/ActivityIndicator";
import Home from "./../views/e-dashboard/Home";
import Navbar from "./../components/E-Dashboard/Navbar";

import SuccessModal from "../components/SuccessModal";
import { SuccessProvider } from "../hooks/useSuccessScreen";
import MyListings from "./../views/e-dashboard/MyListings";
import Account from "./../views/e-dashboard/Account";
import Payments from "./../views/e-dashboard/Payments";
import Settings from "./../views/e-dashboard/Settings";
import ReviewListing from "../views/e-dashboard/new-listing/ReviewListing";
import NewListing from "./../views/e-dashboard/new-listing/NewListing";
import Payment from "./../views/e-dashboard/new-listing/Payment";
import UserPage from "./../views/e-dashboard/UserPage";
import Listing from "../views/e-dashboard/ListingPage";

const EDashboard = () => {
  const [navData] = useState(true);

  useEffect(() => {
    AOS.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const fetchNavbarData = async () => {
  //     const response = await navbarApi.request();
  //     if (response.ok) setNavData(response.data);
  //   };

  //   useEffect(() => {
  //     if (!navData && !navbarApi.error) fetchNavbarData();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <SuccessProvider>
      <div className="dashboard employer-dash">
        <ActivityIndicator visible={false} />
        <SuccessModal />
        {navData && (
          <>
            <Navbar data={navData} />
            <div className="content-container">
              <Switch>
                <Route exact path={`/settings`} component={Settings} />
                <Route exact path={`/user/:id`} component={UserPage} />
                <Route exact path={`/payments`} component={Payments} />
                <Route exact path={`/my-account`} component={Account} />
                <Route exact path={`/my-listings/:id`} component={Listing} />
                <Route exact path={`/my-listings`} component={MyListings} />
                <Route
                  exact
                  path={`/new-listing/payment`}
                  component={Payment}
                />
                <Route
                  exact
                  path={`/new-listing/review`}
                  component={ReviewListing}
                />
                <Route exact path={`/new-listing`} component={NewListing} />
                <Route exact path={`/`} component={Home} />
                <Redirect to="/not-found" />
              </Switch>
            </div>
          </>
        )}
      </div>
    </SuccessProvider>
  );
};

export default EDashboard;
