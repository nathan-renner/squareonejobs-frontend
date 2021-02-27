import React from "react";

import ProgressCard from "./../../components/Dashboard/Home/ProgressCard";
import TodaysJobCard from "./../../components/Dashboard/Home/TodaysJobCard";
import Tasks from "./../../components/Dashboard/Home/Tasks";
import UpcomingJobs from "./../../components/Dashboard/Home/UpcomingJobs";
import JobsForYouCard from "./../../components/Dashboard/Home/JobsForYouCard";

const Home = () => {
  return (
    <div className="content-split">
      <div>
        <JobsForYouCard />
      </div>
      <div>
        <ProgressCard />
        <TodaysJobCard />
        <Tasks />
        <UpcomingJobs />
      </div>
    </div>
  );
};

export default Home;
