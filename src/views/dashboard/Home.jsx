import React from "react";
import Card from "./../../components/Card";
import ProgressCard from "./../../components/Dashboard/Home/ProgressCard";
import TodaysJobCard from "./../../components/Dashboard/Home/TodaysJobCard";
import Tasks from "./../../components/Dashboard/Home/Tasks";
import UpcomingJobs from "./../../components/Dashboard/Home/UpcomingJobs";

const Home = () => {
  return (
    <div className="content-split">
      <div>
        <Card style={{ height: "100em" }}>
          <h2>Home</h2>
        </Card>
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
