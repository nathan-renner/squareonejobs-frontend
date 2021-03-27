import React from "react";

//import AppStore from "../../../assets/images/app-store.png";
//import GooglePlay from "../../../assets/images/google-play.png";

function MobileApp(props) {
  return (
    <section className="bg-dark section-mobile">
      <svg
        className="line-4"
        preserveAspectRatio="none"
        viewBox="0 0 1440 1313"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-1.00837 603.405L-1.05316 688.756L1440 688L-1.00837 603.405Z"
          fill="#2F4858"
        />
      </svg>
      <div className="container-sm">
        <div className="content-container">
          <img
            className="app-img"
            src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/mobile-app.jpg"
            alt="SquareOneJobs mobile app listings screen"
            loading="lazy"
          />
          <div className="content">
            {/* <h2>Get our mobile app!</h2> */}
            <h2>Mobile app coming soon!</h2>
            <p>
              Easily apply to jobs, get upcoming job notifications, and so much
              more from the palm of your hand.
            </p>
            {/* <div className="app-store">
              <img src={AppStore} alt="Download on the App Store button" />
              <img src={GooglePlay} alt="Get it on Google Play button" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileApp;
