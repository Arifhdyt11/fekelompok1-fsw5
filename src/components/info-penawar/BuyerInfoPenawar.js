import React from "react";
import SellerImg from "assets/images/img-infoPenawar2.jpg";

export default function BuyerInfoPenawar(props) {
  return (
    <div className="mt-4" id="buyerInfoPenawar">
      {props.databuyer.map((item) => (
        <div key={item.id} className="card is-block ms-auto p-4">
          <div className="d-flex justify-content-start">
            <img className="seller-image me-3" src={SellerImg} alt="" />
            <div>
              <h4>
                {item.name} <label className="customerTag">Pembeli</label>
              </h4>
              <p>{item.city}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
