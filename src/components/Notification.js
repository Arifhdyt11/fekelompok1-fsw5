import Button from "elements/Button";
import React from "react";
import "assets/css/notification.css";

export default function Notification() {
  const handleClear = (e) => {
    const element = document.getElementById("dropdown-notif");
    element.classList.add("show");
    console.log("click");
  };
  return (
    <ul
      className="dropdown-menu notification p-3"
      aria-labelledby="dropdownnotif"
      style={{ width: "40vw" }}
      id="dropdown-notif"
    >
      <li className="d-flex justify-content-between dropdown-item item">
        <Button className="btn me-5" nonStyle>
          <h5>Notification</h5>
        </Button>
        <Button className="btn ms-5" nonStyle onClick={handleClear}>
          <p>Clear All</p>
        </Button>
      </li>
      <hr className="my-0" />
      <li className=" dropdown-item item my-2 card-notif p-3">
        <div className=" d-flex justify-content-start">
          <img
            className="img-fluid img-notif me-4 align-self-center"
            src="https://res.cloudinary.com/dwqz3oqb8/image/upload/v1657716236/hpmu1mqth40nzgzjmzmu.png"
            alt=""
          />
          <div className="">
            <h5>
              Penawaran Product <span className="success">Success</span>
            </h5>
            <p>Jordan 1 High Element Gore-Tex Light Curry</p>
            <div className="d-flex justify-content-between">
              <div>
                <p>Harga Awal</p>
                <p className="price">
                  <s>Rp. 500.000</s>
                </p>
              </div>
              <i class="fa-solid fa-arrow-right-long align-self-center"></i>
              <div>
                <p>Harga Tawar</p>
                <p className="price">Rp. 100.000</p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className=" dropdown-item item my-2 card-notif p-3 ">
        <div className=" d-flex justify-content-start ">
          <img
            className="img-fluid img-notif me-4 align-self-center"
            src="	https://res.cloudinary.com/dwqz3oqb8/image/upload/v1657832634/ststuajikthitazu4eua.png"
            alt=""
          />
          <div className="align-self-center ">
            <h5>
              Penawaran Product <span className="cancel">Gagal</span>
            </h5>
            <p>Jordan 1 High Element Gore-Tex Light Curry</p>
            <div className="d-flex justify-content-between">
              <div>
                <p>Harga Awal</p>
                <p className="price">Rp. 500.000</p>
              </div>
              <i class="fa-solid fa-arrow-right-long align-self-center"></i>
              <div>
                <p>Harga Tawar</p>
                <p className="price">Rp. 100.000</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
