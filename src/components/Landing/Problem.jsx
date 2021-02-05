import React from "react";

function Problem(props) {
  const HEIGHT = 50;
  return (
    <div className="section section-2">
      <div className="content">
        <div className="problem-container">
          <h1 className="title">Barriers to employment harms</h1>
          <div className="carousel">
            <h1 className="carousel-item item-1" style={{ marginTop: 0 }}>
              individuals.
            </h1>
            <h1 className="carousel-item item-2" style={{ marginTop: HEIGHT }}>
              businesses.
            </h1>
            <h1
              className="carousel-item item-3"
              style={{ marginTop: 2 * HEIGHT }}
            >
              the nation.
            </h1>
            <h1
              className="carousel-item item-4"
              style={{ marginTop: 3 * HEIGHT }}
            >
              everyone.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problem;
