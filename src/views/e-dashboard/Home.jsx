import React, { useState } from "react";

import ActivityIndicator from "./../../components/ActivityIndicator";

import Header from "./../../components/E-Dashboard/Home/Header";

const Home = () => {
  const [dashData] = useState(true);

  // const fetchDashboardData = async () => {
  //   const response = await dashboardApi.request();
  //   if (response.ok) setDashData(response.data);
  // };

  // useEffect(() => {
  //   if (!dashData && !dashboardApi.error) fetchDashboardData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <ActivityIndicator visible={false} />
      {dashData && (
        <>
          <Header data-aos="fade-up" data-aos-once={true} />
          <div className="content-split reversed">
            <div>asdf</div>
            <div>asdf</div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
