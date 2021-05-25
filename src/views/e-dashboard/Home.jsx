import React, { useEffect, useState } from "react";
import Calendar from "../../components/E-Dashboard/Home/Calendar";

import ActivityIndicator from "./../../components/ActivityIndicator";

import Header from "./../../components/E-Dashboard/Home/Header";
import UpcomingDayJobs from "./../../components/E-Dashboard/Home/UpcomingDayJobs";
import Applicants from "./../../components/E-Dashboard/Home/Applicants";
import RecommendedWorkers from "../../components/E-Dashboard/Home/RecommendedWorkers";
import useApi from "./../../hooks/useApi";
import { getDashboardData } from "./../../api/employers";
import { useResponseModal } from "./../../hooks/useResponseModal";

const Home = () => {
  const dashboardApi = useApi(getDashboardData);
  const [dashData, setDashData] = useState(false);
  const { setModal } = useResponseModal();

  const fetchDashboardData = async () => {
    const response = await dashboardApi.request();
    if (response.ok) setDashData(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        buttonText: "Retry",
        onButtonClick: () => fetchDashboardData(),
      });
  };

  useEffect(() => {
    if (!dashData && !dashboardApi.error) fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {dashData.applicants.length > 0 && (
                <Applicants
                  data-aos="fade-up"
                  data-aos-once={true}
                  data-aos-delay={200}
                  applicants={dashData.applicants}
                />
              )}
              <RecommendedWorkers
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay={300}
                workers={dashData.recommendedWorkers}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
