import React, { useEffect, useState } from "react";

import ActivityIndicator from "./../../components/ActivityIndicator";
import Modal from "./../../components/Modal";
import Listing from "./Listing";

import ProgressCard from "./../../components/Dashboard/Home/ProgressCard";
import TodaysJobCard from "./../../components/Dashboard/Home/TodaysJobCard";
import Tasks from "./../../components/Dashboard/Home/Tasks";
import UpcomingJobs from "./../../components/Dashboard/Home/UpcomingJobs";
import JobsForYouCard from "./../../components/Dashboard/Home/JobsForYouCard";

import useApi from "./../../hooks/useApi";
import { getDashboardData } from "../../api/users";
import PointsModal from "../../components/PointsModal";

const Home = () => {
  const dashboardApi = useApi(getDashboardData);
  const [selectedJob, setSelectedJob] = useState(false);
  const [dashData, setDashData] = useState(false);
  const [pointsModal, setPointsModal] = useState(true);

  const fetchDashboardData = async () => {
    const response = await dashboardApi.request();
    if (response.ok) setDashData(response.data);
  };

  useEffect(() => {
    if (!dashData && !dashboardApi.error) fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {pointsModal && (
        <PointsModal
          setVisible={setPointsModal}
          points={351430}
          pointsAdded={51430}
        />
      )}
      <ActivityIndicator visible={dashboardApi.loading} />
      {dashData && (
        <>
          <Modal
            className="nopadding"
            visible={selectedJob}
            Content={Listing}
            onCancel={() => setSelectedJob(false)}
            componentProps={{
              modal: true,
              id: selectedJob,
              onExit: () => setSelectedJob(false),
            }}
          />
          <div className="content-split">
            <div>
              <JobsForYouCard
                data-aos="fade-up"
                data-aos-once={true}
                onSelect={setSelectedJob}
                jobs={dashData.jobsForYou}
              />
            </div>
            <div>
              <ProgressCard
                data-aos="fade-up"
                data-aos-once={true}
                points={dashData.points}
                level={dashData.level}
              />
              {dashData.todaysJob && (
                <TodaysJobCard
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-once={true}
                  todaysJob={dashData.todaysJob}
                  onSelect={setSelectedJob}
                />
              )}
              <Tasks
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-once={true}
              />
              <UpcomingJobs
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-once={true}
                jobs={dashData.thisWeeksJobs}
                onSelect={setSelectedJob}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
