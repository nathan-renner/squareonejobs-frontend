import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./../views/e-dashboard/Home";
import Navbar from "./../components/E-Dashboard/Navbar";

import { SuccessProvider } from "../hooks/useSuccessScreen";
import MyListings from "./../views/e-dashboard/MyListings";
import Account from "./../views/e-dashboard/Account";
import Payments from "./../views/e-dashboard/Payments";
import Settings from "./../views/e-dashboard/Settings";
import ReviewListing from "../views/e-dashboard/new-listing/ReviewListing";
import NewListing from "./../views/e-dashboard/new-listing/NewListing";
import Payment from "./../views/e-dashboard/new-listing/Payment";
import UserPage from "./../views/e-dashboard/UserPage";
import ListingPage from "../views/e-dashboard/ListingPage";
import EditListing from "./../views/e-dashboard/new-listing/EditListing";
import ChangePassword from "./../views/common/ChangePassword";

import {
  ActivityIndicator,
  ResponseModal,
  SuccessModal,
} from "../components/common";

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
        <ResponseModal />
        <ActivityIndicator visible={false} />
        <SuccessModal />
        {navData && (
          <>
            <Navbar data={navData} />
            <div className="content-container">
              <Switch>
                <Route
                  path={`/settings/change-password`}
                  component={ChangePassword}
                />
                <Route path={`/settings`} component={Settings} />
                <Route path={`/user/:id`} component={UserPage} />
                <Route path={`/payments`} component={Payments} />
                <Route path={`/my-account`} component={Account} />
                <Route path={`/my-listings`} component={MyListings} />
                <Route path={`/listing/:id`} component={ListingPage} />
                <Route path={`/new-listing/payment`} component={Payment} />
                <Route path={`/new-listing/review`} component={ReviewListing} />
                <Route path={`/new-listing`} component={NewListing} />
                <Route path={`/edit-listing/:id`} component={EditListing} />
                <Route exact path="/" component={Home} />
                <Redirect to="/" />
              </Switch>
            </div>
          </>
        )}
      </div>
    </SuccessProvider>
  );
};

export default EDashboard;
