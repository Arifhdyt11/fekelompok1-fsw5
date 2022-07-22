import React from "react";
import "assets/css/lazyload.css";

export default function CardLoading({ transaction, col, count }) {
  const showCard = () => {
    const countCard = [];
    for (let i = 0; i < count; i++) {
      if (transaction) {
        countCard.push(
          <div key={i} className="mb-4 ">
            <div class="card " aria-hidden="true">
              <div className="row">
                <div class="col-lg-3 col-md-6 col-sm-12  ">
                  <div className="card-img-top"></div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 card-body">
                  <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                  </p>
                  <a
                    href="#"
                    tabindex="-1"
                    class="btn btn-secondary disabled placeholder col-11"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        countCard.push(
          <div
            key={i}
            className={`mb-4 ${
              col === "4"
                ? "col-lg-3 col-md-6 col-sm-12"
                : col === "3"
                ? "col-lg-4 col-md-6 col-sm-12 "
                : "col-lg-12 col-md-12 col-sm-12 "
            }`}
          >
            <div class="card" aria-hidden="true">
              <div class="card-img-top " style={{ minHeight: "30vh" }} />
              <div class="card-body">
                <h5 class="card-title placeholder-glow">
                  <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                  <span class="placeholder col-7"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-8"></span>
                </p>
                <div
                  tabindex="-1"
                  class="btn btn-secondary disabled placeholder col-12"
                ></div>
              </div>
            </div>
          </div>
        );
      }
    }
    return countCard;
  };
  return <>{showCard()}</>;
}
