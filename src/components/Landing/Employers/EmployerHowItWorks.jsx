import React, { useRef } from "react";
import CheckIcon from "../../icons/CheckIcon";
import JobListing1 from "../../../assets/images/screenshots/job-screenshot-1.png";
import JobListing2 from "../../../assets/images/screenshots/job-screenshot-2.png";
import UserProfile from "../../../assets/images/screenshots/user-profile-screenshot.png";
import UserDocuments from "../../../assets/images/screenshots/user-documents-screenshot.png";
import UserReferences from "../../../assets/images/screenshots/user-references-screenshot.png";
import UserAbout from "../../../assets/images/screenshots/user-about-screenshot.png";
import UserEducation from "../../../assets/images/screenshots/user-education-screenshot.png";
import UserExperience from "../../../assets/images/screenshots/user-experience-screenshot.png";
import UserSkills from "../../../assets/images/screenshots/user-skills-screenshot.png";
import useOnScreen from "./../../../hooks/useOnScreen";

function EmployerHowItWorks(props) {
  const dayRef = useRef();
  const fullRef = useRef();
  const isDayVisible = useOnScreen(dayRef);
  const isFullVisible = useOnScreen(fullRef);

  return (
    <section className="employer-how">
      <div className="container-sm">
        <h2 className="title">Top features for top recruitment</h2>
        <div
          className={`pt-container ${isDayVisible ? "visible" : null}`}
          ref={dayRef}
        >
          <div className="blob-container">
            <svg
              className="pt-blob"
              viewBox="0 0 475 493"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M453.76 210.528c44.044-89.201 16.5-168.5-67-205S76.462 123.054 37.463 181.028c-38.999 57.975-79.75 250.31 57.797 307.001 74 30.499 134.74-89.908 207.24-124.529 72.5-34.621 129.288-108.472 151.26-152.972z"
                fill="#EFFAF5"
              />
            </svg>
            <img
              className="listing-screenshot"
              src={JobListing1}
              alt="Job Listing Screenshot"
            />
            <img
              className="listing-screenshot-2"
              src={JobListing2}
              alt="Company Information Screenshot"
            />
          </div>
          <div className="pt-text">
            <h2>Post Day Jobs and Part-Time Jobs</h2>
            <div className="check-list">
              <div>
                <CheckIcon />
                <p>Pay hourly</p>
              </div>
              <div>
                <CheckIcon />
                <p>brUH</p>
              </div>
              <div>
                <CheckIcon />
                <p>Relist jobs with ease</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`ft-container ${isFullVisible ? "visible" : null}`}
          ref={fullRef}
        >
          <div className="blob-container">
            <div className="ss-container">
              <img
                className="ss-left s1"
                src={UserProfile}
                alt="User Profile Screenshot"
              />
              <img
                className="ss-left s2"
                src={UserDocuments}
                alt="User Documents Screenshot"
              />
              <img
                className="ss-left s3"
                src={UserReferences}
                alt="User Referenes Screenshot"
              />
              <img
                className="ss-right s4"
                src={UserAbout}
                alt="User References Screenshot"
              />
              <img
                className="ss-right s5"
                src={UserEducation}
                alt="User Education Screenshot"
              />
              <img
                className="ss-right s6"
                src={UserExperience}
                alt="User Experience Screenshot"
              />
              <img
                className="ss-right s7"
                src={UserSkills}
                alt="User Skills Screenshot"
              />
            </div>
            <svg
              className="ft-blob"
              viewBox="0 0 499 587"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M456.078 51.535c-82.846-68.683-174.5-62.99-261-16.5-60.204 32.357-123.65 98.669-156 167-27.696 58.5-80.273 301.699 18 345.999 92.084 41.511 160.992 56.94 249.5 8.5 74-40.5 125.901-119.999 137-195.499 11.099-75.5 109.599-229.002 12.5-309.5z"
                fill="#EBF5FE"
              />
            </svg>
          </div>
          <div className="ft-text">
            <h2>Recruit for Full-Time Positions</h2>
            <div className="check-list">
              <div>
                <CheckIcon fill="secondary" />
                <p>words</p>
              </div>
              <div>
                <CheckIcon fill="secondary" />
                <p>more words</p>
              </div>
              <div>
                <CheckIcon fill="secondary" />
                <p>aaaaaAAAAAA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployerHowItWorks;
