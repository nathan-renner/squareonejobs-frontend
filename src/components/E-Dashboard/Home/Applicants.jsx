import React from "react";
import { useHistory, NavLink } from "react-router-dom";

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

function Applicants({ applicants, ...props }) {
  const history = useHistory();
  const renderApplicants = () => {
    return applicants.map((app, index) => (
      <div className="applicant" key={index}>
        <NavLink className="position" to={`/listing/${app.jobId}`}>
          For: "{app.position}"
        </NavLink>
        <div className="user-header">
          <img
            src={app.avatar ? app.avatar : defaultAvatar}
            alt={`${app.firstName} ${app.lastName}'s avatar`}
            onClick={() => history.push(`/user/${app._id}`)}
          />
          <div>
            <NavLink
              className="username"
              to={`user/${app._id}`}
            >{`${app.firstName} ${app.lastName}`}</NavLink>
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
