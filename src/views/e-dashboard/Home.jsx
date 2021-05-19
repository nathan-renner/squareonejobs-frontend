import React, { useEffect, useState } from "react";
import Calendar from "../../components/E-Dashboard/Home/Calendar";

import ActivityIndicator from "./../../components/ActivityIndicator";

import Header from "./../../components/E-Dashboard/Home/Header";
import UpcomingDayJobs from "./../../components/E-Dashboard/Home/UpcomingDayJobs";
import Applicants from "./../../components/E-Dashboard/Home/Applicants";
import RecommendedCandidates from "./../../components/E-Dashboard/Home/RecommendedCandidates";
import useApi from "./../../hooks/useApi";
import { getDashboardData } from "./../../api/employers";
import ResponseModal from "./../../components/ResponseModal";

const Home = () => {
  const dashboardApi = useApi(getDashboardData);
  const [dashData, setDashData] = useState(false);

  const fetchDashboardData = async () => {
    const response = await dashboardApi.request();
    if (response.ok) setDashData(response.data);
  };

  useEffect(() => {
    if (!dashData && !dashboardApi.error) fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(dashData);
  return (
    <>
      <ActivityIndicator visible={dashboardApi.loading} />
      {dashData && (
        <>
          <Header
            data-aos="fade-up"
            data-aos-once={true}
            data={dashData.header}
          />
          <div className="content-split reversed">
            <div>
              <UpcomingDayJobs
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay={100}
                jobs={dashData.thisWeeksJobs}
              />
              <Calendar
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay={200}
              />
            </div>
            <div>
              <Applicants
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay={200}
                applicants={dashData.applicants}
              />
              <RecommendedCandidates
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay={300}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
