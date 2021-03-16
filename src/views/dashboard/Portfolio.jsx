import React, { useState } from "react";
import moment from "moment";

import Header from "./../../components/Dashboard/Portfolio/Header";
import About from "./../../components/Dashboard/Portfolio/About";
import Education from "./../../components/Dashboard/Portfolio/Education";
import WorkExperience from "./../../components/Dashboard/Portfolio/WorkExperience";
import Skills from "./../../components/Dashboard/Portfolio/Skills";

function Portfolio(props) {
  const [portfolio, setPortfolio] = useState({
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, reiciendis modi iusto enim ipsum veniam fuga ad quidem, recusandae id debitis.",
    education: [
      {
        degree: "Degree asdfas dfa fasdf asdf  asfasd fas fsadf",
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
    ],
    workExperience: [
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
    ],
    skills: {
      top: ["skill1", "skill2", "skill3"],
      other: ["skill4", "skill5", "skill6", "skill7"],
    },
  });

  const updateElement = (element, value) => {
    const port = { ...portfolio };
    port[element] = value;
    setPortfolio(port);

    // const response = await updateElementApi.request(
    //   user.profileId,
    //   element,
    //   value
    // );
    // console.log(response.data);
    // if (response.ok) {
    //   setPortfolio(response.data);
    // }
  };

  return (
    <div className="portfolio">
      <Header data-aos="fade-up" data-aos-once={true} data-aos-offset="0" />
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
  );
}

export default Portfolio;
