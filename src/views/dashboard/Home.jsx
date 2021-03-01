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
        <JobsForYouCard data-aos="fade-up" />
      </div>
      <div>
        <ProgressCard data-aos="fade-up" />
        <TodaysJobCard data-aos="fade-up" data-aos-delay="100" />
        <Tasks data-aos="fade-up" data-aos-delay="200" />
        <UpcomingJobs data-aos="fade-up" data-aos-delay="300" />
      </div>
    </div>
  );
};

export default Home;
