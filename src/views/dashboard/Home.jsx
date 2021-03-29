import React, { useState } from "react";

import ProgressCard from "./../../components/Dashboard/Home/ProgressCard";
import TodaysJobCard from "./../../components/Dashboard/Home/TodaysJobCard";
import Tasks from "./../../components/Dashboard/Home/Tasks";
import UpcomingJobs from "./../../components/Dashboard/Home/UpcomingJobs";
import JobsForYouCard from "./../../components/Dashboard/Home/JobsForYouCard";
import Modal from "./../../components/Modal";
import Listing from "./Listing";
import moment from "moment";

const jobs = [
  {
    _id: 123551,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 1,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 2,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 3,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 4,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 5,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
];
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
            jobs={jobs}
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
