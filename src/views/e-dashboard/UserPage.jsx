import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useApi from "./../../hooks/useApi";
import { getUser } from "../../api/users";
import ActivityIndicator from "./../../components/ActivityIndicator";
import Header from "../../components/E-Dashboard/UserPortfolio/Header";
import Documents from "./../../components/Dashboard/Portfolio/Documents";
import References from "./../../components/E-Dashboard/UserPortfolio/References";
import About from "./../../components/E-Dashboard/UserPortfolio/About";
import Education from "./../../components/E-Dashboard/UserPortfolio/Education";
import WorkExperience from "./../../components/E-Dashboard/UserPortfolio/WorkExperience";
import Skills from "./../../components/E-Dashboard/UserPortfolio/Skills";
import History from "./../../components/E-Dashboard/UserPortfolio/History";
import { useResponseModal } from "./../../hooks/useResponseModal";
import Card from "../../components/Card";
import Icon from "./../../components/Icon";
import { FaUserCircle } from "react-icons/fa";

function UserPage(props) {
  const { id } = useParams();
  const getUserApi = useApi(getUser);
  const [user, setUser] = useState(false);
  const { setModal } = useResponseModal(useResponseModal);

  const fetchUser = async () => {
    const response = await getUserApi.request(id);
    if (response.ok) setUser(response.data);
    else if (response.status !== 400) {
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
    }
  };

  useEffect(() => {
    if (!user && !getUserApi.error) fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="portfolio e-portfolio">
      <ActivityIndicator visible={getUserApi.loading} />
      {user ? (
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
            {(user.history.current.length > 0 ||
              user.history.previous.length > 0) && (
              <History
                data-aos="fade-up"
                data-aos-once={true}
                history={user.history}
              />
            )}
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
      ) : (
        <Card className="user-not-found">
          <Icon
            Icon={FaUserCircle}
            sizeFactor={1}
            size={50}
            iconColor="medium"
            color="white"
            className="icon"
          />
          <h2>User not found</h2>
        </Card>
      )}
    </div>
  );
}

export default UserPage;
