import React from "react";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import StarRating from "./../../StarRating";

const applicants = [
  {
    position: "Frontend Developer",
    firstName: "John",
    lastName: "Smith",
    avatar: defaultAvatar,
    rating: 5,
    skills: ["Html, CSS", "Javascript", "React", "another", "Another"],
  },
  {
    position: "Frontend Developer",
    firstName: "John",
    lastName: "Smith",
    avatar: defaultAvatar,
    rating: 5,
    skills: ["Html, CSS", "Javascript", "React", "another", "Another"],
  },
  {
    position: "Frontend Developer",
    firstName: "John",
    lastName: "Smith",
    avatar: defaultAvatar,
    rating: 5,
    skills: ["Html, CSS", "Javascript", "React", "another", "Another"],
  },
  {
    position: "Frontend Developer",
    firstName: "John",
    lastName: "Smith",
    avatar: defaultAvatar,
    rating: 5,
    skills: ["Html, CSS", "Javascript", "React", "another", "Another"],
  },
  {
    position: "Frontend Developer",
    firstName: "John",
    lastName: "Smith",
    avatar: defaultAvatar,
    rating: 5,
    skills: ["Html, CSS", "Javascript", "React", "another", "Another"],
  },
];

function Applicants({ ...props }) {
  const renderApplicants = () => {
    return applicants.map((app, index) => (
      <div className="applicant" key={index}>
        <p className="position">For: "{app.position}"</p>
        <div className="user-header">
          <img
            src={app.avatar ? app.avatar : defaultAvatar}
            alt={`${app.firstName} ${app.lastName}'s avatar`}
          />
          <div>
            <h3>{`${app.firstName} ${app.lastName}`}</h3>
            <StarRating rating={app.rating} />
          </div>
        </div>
        <div className="skills">
          <p>Skills: </p>
          <p>{app.skills.join(", ").substr(0, 50) + "\u2026"}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="card" {...props}>
      <h2>Applicants</h2>
      <div className="applicants">{renderApplicants()}</div>
    </div>
  );
}

export default Applicants;
