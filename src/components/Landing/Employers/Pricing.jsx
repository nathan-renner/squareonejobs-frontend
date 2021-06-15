import React from "react";
import CheckIconWhite from "../../icons/CheckIconWhite.jsx";

function Pricing(props) {
  // document.querySelectorAll(".accordion-button").forEach((button) => {
  //   button.addEventListener("click", () => {
  //     // const accordionContent = button.nextElementSibling;

  //     button.classList.toggle("accordion-button:active");

  //     // if (button.classList.contains("accordion-button:active")) {
  //     //   accordionContent.getElementsByClassName.maxHeight =
  //     //     accordionContent.scrollHeight + "px";
  //     // } else {
  //     //   accordionContent.getElementsByClassName.maxHeight = 0;
  //     // }
  //   });
  // });

  // document
  //   .getElementsByClassName("accordion-button")[0]
  //   .addEventListener("click", function () {
  //     if (this.classList.contains("active")) {
  //       this.classList.remove("active");
  //     } else this.classList.add("active");
  //   });

  return (
    <section className="bg-dark pricing">
      <div className="container split">
        <div className="text-container">
          <h2>Pricing</h2>
          <p>
            Our comprehensive payment plans allow our services to be accessbile
            to any size company
          </p>
        </div>
        <div className="standard-accordion">
          <button type="button" className="accordion-button">
            $99
          </button>
          <div className="accordion-content">
            <div>
              <CheckIconWhite />
              <p>words</p>
            </div>
            <div>
              <CheckIconWhite />
              <p>more words</p>
            </div>
            <div>
              <CheckIconWhite />
              <p>aaaaaAAAAAA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
