import React from "react";

import ImageHero from "../../assets/images/img-hero.png";

export default function Hero() {
  return (
    <section className="container section-hero">
      <div className="row">
        <div className="col-auto pr-5 align-self-center" style={{ width: 530 }}>
          <h1 className="font-weight-bold line-height-1 mb-3">
            Be Trendy And <br />
            In Style
          </h1>
          <p
            className="mb-4 font-weight-light text-gray-500 w-75"
            style={{ lineHeight: "170%" }}
          >
            Explore the latest shoes for every sport, workout and everyday look.
            Built for ultimate performance and sneaker style.
          </p>
          <a className="btn btn-login ms-auto px-3 py-2" type="submit">
            Mulai Belanja
          </a>
          <div className="row" style={{ marginTop: 80 }}></div>
        </div>

        <div className="col-6 pl-5">
          <div style={{ width: 545, height: 491 }}>
            <img
              src={ImageHero}
              alt="Room with couches"
              className="img-fluid position-absolute "
              style={{ margin: "0px 0px 0px 0px", zIndex: 1 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
