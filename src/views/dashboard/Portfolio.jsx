import React, { useEffect, useState } from "react";

import Header from "./../../components/Dashboard/Portfolio/Header";
import About from "./../../components/Dashboard/Portfolio/About";
import Education from "./../../components/Dashboard/Portfolio/Education";
import WorkExperience from "./../../components/Dashboard/Portfolio/WorkExperience";
import Skills from "./../../components/Dashboard/Portfolio/Skills";

import { getPortfolio, updatePortfolioElement } from "../../api/users";
import useApi from "./../../hooks/useApi";
import useAuth from "./../../auth/useAuth";
import ActivityIndicator from "./../../components/ActivityIndicator";
import UploadScreen from "./../../components/UploadScreen";
import References from "./../../components/Dashboard/Portfolio/References";
import Documents from "../../components/Dashboard/Portfolio/Documents";
import { useResponseModal } from "./../../hooks/useResponseModal";

function Portfolio(props) {
  const getPortfolioApi = useApi(getPortfolio);
  const updateElementApi = useApi(updatePortfolioElement);
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setModal } = useResponseModal();

  const fetchPortfolio = async () => {
    const response = await getPortfolioApi.request(user.profileId);
    if (response.ok)
      setPortfolio({
        ...response.data,
        //avatar: `${response.data.avatar}?${Date.now()}`,
      });
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        buttonText: "Retry",
        onButtonClick: () => {
          setModal(false);
          fetchPortfolio();
        },
      });
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
      setPortfolio({
        ...response.data,
        userDetails: { ...portfolio.userDetails },
        references: [...portfolio.references],
        referencesLength: portfolio.referencesLength,
      });
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  const updateAccount = (newData) => {
    const newPortfolio = { ...portfolio };
    newPortfolio.userDetails = newData;
    setPortfolio(newPortfolio);
  };

  const updateDocuments = (newData) => {
    const newPortfolio = { ...portfolio };
    newPortfolio.documents = newData;
    setPortfolio(newPortfolio);
  };

  return (
    <>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ActivityIndicator
        visible={getPortfolioApi.loading || updateElementApi.loading || loading}
      />
      <div className="portfolio">
        {portfolio && (
          <>
            <div>
              <Header
                data-aos="fade-up"
                data-aos-once={true}
                portfolio={portfolio}
                setLoading={setLoading}
                updateAccountDetails={updateAccount}
                setProgress={setProgress}
                setUploadVisible={setUploadVisible}
              />
              <Documents
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay="100"
                setProgress={setProgress}
                setUploadVisible={setUploadVisible}
                updateDocuments={updateDocuments}
                portfolio={portfolio}
                setLoading={setLoading}
              />
              <References
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay="200"
                portfolio={portfolio}
                setLoading={setLoading}
              />
            </div>
            <div className="content">
              <About
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-once={true}
                {...{ portfolio, updateElement }}
              />
              <Education
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-once={true}
                {...{ portfolio, updateElement }}
              />
              <WorkExperience
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-once={true}
                {...{ portfolio, updateElement }}
              />
              <Skills
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-once={true}
                {...{ portfolio, updateElement }}
              />
            </div>
          </>
        )}
        {/* {getPortfolioApi.error && (
          <div className="error-container">
            <div>
              <h3>Error loading portfolio</h3>
              <Button label="retry" onClick={() => fetchPortfolio()} />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Portfolio;
