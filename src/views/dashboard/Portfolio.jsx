import React, { useEffect, useState } from "react";

import Header from "./../../components/Dashboard/Portfolio/Header";
import About from "./../../components/Dashboard/Portfolio/About";
import Education from "./../../components/Dashboard/Portfolio/Education";
import WorkExperience from "./../../components/Dashboard/Portfolio/WorkExperience";
import Skills from "./../../components/Dashboard/Portfolio/Skills";

import { getPortfolio, updatePortfolioElement } from "../../api/users";
import useApi from "./../../hooks/useApi";
import useAuth from "./../../auth/useAuth";
import Button from "./../../components/Button";
import ActivityIndicator from "./../../components/ActivityIndicator";

function Portfolio(props) {
  const getPortfolioApi = useApi(getPortfolio);
  const updateElementApi = useApi(updatePortfolioElement);
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(false);

  const fetchPortfolio = async () => {
    const response = await getPortfolioApi.request(user.profileId);
    if (response.ok) setPortfolio(response.data);
  };

  useEffect(() => {
    if (!portfolio && !getPortfolioApi.error) fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateElement = async (element, value) => {
    const response = await updateElementApi.request(
      user.profileId,
      element,
      value
    );

    if (response.ok) {
      setPortfolio(response.data);
    }
  };

  return (
    <div className="portfolio">
      <ActivityIndicator
        visible={getPortfolioApi.loading || updateElementApi.loading}
      />
      {portfolio && (
        <>
          <Header data-aos="fade-up" data-aos-once={true} data-aos-offset="0" />
          <div className="content">
            <About
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-once={true}
              data-aos-offset="0"
              {...{ portfolio, updateElement }}
            />
            <Education
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-once={true}
              data-aos-offset="0"
              {...{ portfolio, updateElement }}
            />
            <WorkExperience
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once={true}
              data-aos-offset="0"
              {...{ portfolio, updateElement }}
            />
            <Skills
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once={true}
              data-aos-offset="0"
              {...{ portfolio, updateElement }}
            />
          </div>
        </>
      )}
      {getPortfolioApi.error && (
        <div className="error-container">
          <div>
            <h3>Error loading portfolio</h3>
            <Button label="retry" onClick={() => fetchPortfolio()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
