import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useApi from "./../../hooks/useApi";
import { getUser } from "../../api/users";
import ActivityIndicator from "./../../components/ActivityIndicator";
import Button from "../../components/Button";
import Header from "../../components/E-Dashboard/UserPortfolio/Header";
import Documents from "./../../components/Dashboard/Portfolio/Documents";
import References from "./../../components/E-Dashboard/UserPortfolio/References";
import About from "./../../components/E-Dashboard/UserPortfolio/About";
import Education from "./../../components/E-Dashboard/UserPortfolio/Education";
import WorkExperience from "./../../components/E-Dashboard/UserPortfolio/WorkExperience";
import Skills from "./../../components/E-Dashboard/UserPortfolio/Skills";

function UserPage(props) {
  const { id } = useParams();
  const getUserApi = useApi(getUser);
  const [user, setUser] = useState(false);

  const fetchUser = async () => {
    const response = await getUserApi.request(id);
    if (response.ok) setUser(response.data);
  };

  useEffect(() => {
    if (!user && !getUserApi.error) fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="portfolio e-portfolio">
      <ActivityIndicator visible={getUserApi.loading} />
      {user && (
        <>
          <div>
            <Header data-aos="fade-up" data-aos-once={true} user={user.user} />
            <Documents
              data-aos="fade-up"
              data-aos-once={true}
              data-aos-delay="100"
              portfolio={user.portfolio}
              edit={false}
            />
            <References
              data-aos="fade-up"
              data-aos-once={true}
              data-aos-delay="200"
              portfolio={user.user}
              id={id}
            />
          </div>
          <div className="content">
            <About
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-once={true}
              portfolio={user.portfolio}
            />
            <Education
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-once={true}
              portfolio={user.portfolio}
            />
            <WorkExperience
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once={true}
              portfolio={user.portfolio}
            />
            <Skills
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once={true}
              portfolio={user.portfolio}
            />
          </div>
        </>
      )}
      {getUserApi.error && (
        <div className="error-container">
          <div>
            <h3>Error loading portfolio</h3>
            <Button label="retry" onClick={() => fetchUser()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
