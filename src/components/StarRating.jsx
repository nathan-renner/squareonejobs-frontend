import React from "react";

import { MdStarBorder, MdStar } from "react-icons/md";

function StarRating({
  rating = 5,
  size = 25,
  editable = false,
  setRating = () => true,
}) {
  const arr = [1, 2, 3, 4, 5];

  const renderStars = () => {
    return arr.map((e, index) => {
      if (rating - index > 0) {
        return (
          <MdStar
            key={e}
            name="star"
            size={size}
            color="#ffc107"
            className="star"
            onClick={() => (editable ? setRating(e) : true)}
          />
        );
      } else {
        return (
          <MdStarBorder
            key={e}
            name="star-outline"
            size={size}
            color="#ffc107"
            className="star"
            onClick={() => (editable ? setRating(e) : true)}
          />
        );
      }
    });
  };

  return (
    <div className={`star-ratings ${editable ? "editable" : null}`}>
      {renderStars()}
    </div>
  );
}

export default StarRating;
