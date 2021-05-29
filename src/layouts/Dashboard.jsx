import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import ActivityIndicator from "./../components/ActivityIndicator";
import Home from "./../views/dashboard/Home";
import Navbar from "./../components/Dashboard/Navbar";
import MyJobs from "./../views/dashboard/MyJobs";
import Payments from "./../views/dashboard/Payments";
import Portfolio from "./../views/dashboard/Portfolio";
import Settings from "./../views/dashboard/Settings";
import Account from "./../views/dashboard/Account";
import Explore from "./../views/dashboard/Explore";
import Search from "./../views/dashboard/Search";

import { getNavbarData } from "./../api/users";
import useApi from "./../hooks/useApi";
import SuccessModal from "../components/SuccessModal";
import { SuccessProvider } from "../hooks/useSuccessScreen";
import { useResponseModal } from "../hooks/useResponseModal";
import ChangePassword from "./../views/common/ChangePassword";
import ResponseModal from "../components/ResponseModal";
import ListingPage from "./../views/dashboard/ListingPage";
import PointsModal from "./../components/PointsModal";
import PointsContext from "./../context/pointsContext";

const Dashboard = () => {
  const navbarApi = useApi(getNavbarData);
  const [navData, setNavData] = useState(false);
  const [points, setPoints] = useState(false);
  const { setModal } = useResponseModal();

  useEffect(() => {
    AOS.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNavbarData = async () => {
    const response = await navbarApi.request();
    if (response.ok) setNavData(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!navData && !navbarApi.error) fetchNavbarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SuccessProvider>
      <PointsContext.Provider value={{ points, setPoints }}>
        <div className="dashboard user-dash">
          {navData && (
            <>
              <Navbar data={navData} />
              <div className="content-container">
                <Switch>
                  <Route path={`/listing/:id`} component={ListingPage} />
                  <Route path={`/search`} component={Search} />
                  <Route path={`/explore`} component={Explore} />
                  <Route path={`/account`} component={Account} />
                  <Route
                    path={`/settings/change-password`}
                    component={ChangePassword}
                  />
                  <Route path={`/settings`} component={Settings} />
                  <Route path={`/portfolio`} component={Portfolio} />
                  <Route path={`/payments`} component={Payments} />
                  <Route path={`/my-jobs`} component={MyJobs} />
                  <Route exact path={`/`} component={Home} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </>
          )}
          <ResponseModal />
          <PointsModal />
          <ActivityIndicator visible={navbarApi.loading} />
          <SuccessModal />
        </div>
      </PointsContext.Provider>
    </SuccessProvider>
  );
};

export default Dashboard;
