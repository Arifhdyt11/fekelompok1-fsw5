import React from "react";
import imgCust from "assets/images/img-infoPenawar2.jpg";
import "assets/css/infoPenawar.css";

export default function BuyerInfoPenawar(props) {
  return (
    <div className="mt-4" id="buyerInfoPenawar">
      {props.databuyer.map((item) => (
        <div key={item} className="card shadow">
          <div className="card-body">
            <div className="row gx-5 customer" id="row">
              <div className="col-auto ">
                <div>
                  <img
                    className="imageProfile"
                    src={imgCust}
                    alt="Customer 1"
                  />
                </div>
              </div>
              <div className="col">
                <div className="me-auto mb-2">
                  <p className="buyerInfoPenawar">
                    {item.name}
                    <label className="customerTag">Pembeli</label>
                  </p>
                  <p className="customerCity">{item.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
