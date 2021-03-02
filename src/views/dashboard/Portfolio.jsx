import React from "react";

import Header from "./../../components/Dashboard/Portfolio/Header";
import About from "./../../components/Dashboard/Portfolio/About";
import Education from "./../../components/Dashboard/Portfolio/Education";
import WorkExperience from "./../../components/Dashboard/Portfolio/WorkExperience";
import Skills from "./../../components/Dashboard/Portfolio/Skills";

function Portfolio(props) {
  return (
    <div className="portfolio">
      <Header data-aos="fade-up" data-aos-once={true} data-aos-offset="0" />
      <About
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-once={true}
        data-aos-offset="0"
      />
      <Education
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-once={true}
        data-aos-offset="0"
      />
      <WorkExperience
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-once={true}
        data-aos-offset="0"
      />
      <Skills
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-once={true}
        data-aos-offset="0"
      />
    </div>
  );
}

export default Portfolio;
