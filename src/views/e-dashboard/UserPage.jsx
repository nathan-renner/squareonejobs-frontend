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
import History from "./../../components/E-Dashboard/UserPortfolio/History";
import ResponseModal from "../../components/ResponseModal";

function UserPage(props) {
  const { id } = useParams();
  const getUserApi = useApi(getUser);
  const [user, setUser] = useState(false);
  const [modal, setModal] = useState(false);

  const fetchUser = async () => {
    const response = await getUserApi.request(id);
    if (response.ok) setUser(response.data);
    else {
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
      <ResponseModal
        visible={modal}
        onButtonClick={() => setModal(false)}
        type={modal.type}
        body={modal.body}
        header={modal.header}
        buttonText="retry"
        onButtonClick={fetchUser}
      />
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
            {(user.history.current !== [] || user.history.previous !== []) && (
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
      )}
    </div>
  );
}

export default UserPage;
