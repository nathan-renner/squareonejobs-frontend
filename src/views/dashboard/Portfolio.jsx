import React from "react";
import moment from "moment";

import Header from "./../../components/Dashboard/Portfolio/Header";
import About from "./../../components/Dashboard/Portfolio/About";
import Education from "./../../components/Dashboard/Portfolio/Education";
import WorkExperience from "./../../components/Dashboard/Portfolio/WorkExperience";
import Skills from "./../../components/Dashboard/Portfolio/Skills";

const education = [
  {
    degree: "Degree",
    school: "School",
    startDate: moment(),
    endDate: moment().add(4, "years"),
  },
  {
    degree: "Degree",
    school: "School",
    startDate: moment(),
    endDate: moment().add(4, "years"),
  },
];

const workExperience = [
  {
    title: "Title",
    company: "Company",
    startDate: moment(),
    endDate: moment().add(4, "years"),
  },
  {
    title: "Title",
    company: "Company",
    startDate: moment(),
    endDate: moment().add(4, "years"),
  },
];

const skills = [
  "skill1",
  "skill2",
  "skill3",
  "skill4",
  "skill5",
  "skill6",
  "skill7",
];

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
        education={education}
      />
      <WorkExperience
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-once={true}
        data-aos-offset="0"
        workExperience={workExperience}
      />
      <Skills
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-once={true}
        data-aos-offset="0"
        skills={skills}
      />
    </div>
  );
}

export default Portfolio;
