import React from "react";
import "assets/css/lazyload.css";

export default function CardLoading({ transaction, col, count }) {
  const showCard = () => {
    const countCard = [];
    for (let i = 0; i < count; i++) {
      if (transaction) {
        countCard.push(
          <div key={i} className="mb-4 ">
            <div className="card-loading transaction row  p-3 ">
              <div className="col-md-4">
                <div className="img-loading"></div>
              </div>
              <div className="col-md-4">
                <div className="h-50 pb-2">
                  <div className="description-loading h-100"></div>
                </div>
                <div className="h-50 pt-2">
                  <div className="info-loading h-100"></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="h-50 pb-2">
                  <div className="description-loading h-100"></div>
                </div>
                <div className="h-50 pt-2">
                  <div className="info-loading h-100"></div>
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
            <div className="card-loading p-3">
              <div className="img-loading mb-2"></div>
              <div className="description-loading mb-2"></div>
              <div className="info-loading"></div>
            </div>
          </div>
        );
      }
    }
    return countCard;
  };
  return <>{showCard()};</>;
}
