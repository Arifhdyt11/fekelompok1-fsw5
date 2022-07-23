import React from "react";
import "assets/css/lazyload.css";

export default function CardLoading({ transaction, col, count }) {
  const showCard = () => {
    const countCard = [];
    for (let i = 0; i < count; i++) {
      if (transaction) {
        countCard.push(
          <div key={i} className="mb-4 ">
            <div className="card " aria-hidden="true">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12  ">
                  <div className="card-img-top"></div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                  <a
                    href="#"
                    tabIndex="-1"
                    className="btn btn-secondary disabled placeholder col-11"
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
            <div className="card" aria-hidden="true">
              <div className="card-img-top " style={{ minHeight: "30vh" }} />
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <div
                  tabIndex="-1"
                  className="btn btn-secondary disabled placeholder col-12"
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
