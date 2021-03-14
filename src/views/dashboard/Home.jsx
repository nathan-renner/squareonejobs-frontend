import React, { useState } from "react";

import ProgressCard from "./../../components/Dashboard/Home/ProgressCard";
import TodaysJobCard from "./../../components/Dashboard/Home/TodaysJobCard";
import Tasks from "./../../components/Dashboard/Home/Tasks";
import UpcomingJobs from "./../../components/Dashboard/Home/UpcomingJobs";
import JobsForYouCard from "./../../components/Dashboard/Home/JobsForYouCard";
import Modal from "./../../components/Modal";
import Listing from "./Listing";

const Home = () => {
  const [selectedJob, setSelectedJob] = useState(false);

  return (
    <>
      <Modal
        className="nopadding"
        visible={selectedJob}
        Content={Listing}
        onCancel={() => setSelectedJob(false)}
        componentProps={{
          modal: true,
          id: 1,
          onExit: () => setSelectedJob(false),
        }}
      />
      <div className="content-split">
        <div>
          <JobsForYouCard
            data-aos="fade-up"
            data-aos-once={true}
            onSelect={setSelectedJob}
          />
        </div>
        <div>
          <ProgressCard data-aos="fade-up" data-aos-once={true} />
          <TodaysJobCard
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-once={true}
          />
          <Tasks data-aos="fade-up" data-aos-delay="200" data-aos-once={true} />
          <UpcomingJobs
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-once={true}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
