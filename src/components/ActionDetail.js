import { useDispatch, useSelector } from "react-redux";

import SellerImg from "assets/images/seller-1.png";
import Button from "elements/Button";
import { formatPrice } from "utils/defaultFormat";
import { Link } from "react-router-dom";

function CheckButton({ isSeller, id, getProductIdResult }) {
  if (isSeller === "yes") {
    return (
      <>
        <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
          Terbitkan
        </Button>
        <Link
          to={`/update-product/${id}`}
          state={{ getProductIdResult: { getProductIdResult } }}
        >
          <Button
            className="btn mt-3 ms-auto py-2"
            isSecondary
            hasShadow
            isBlock
          >
            Edit
          </Button>
        </Link>
      </>
    );
  } else {
    return (
      <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
        Tertarik dan Nego
      </Button>
    );
  }
}

export default function ActionDetail({ isSeller, id }) {
  const { getProductIdResult, getProductIdLoading, getProductIdError } =
    useSelector((state) => state.ProductReducer);

  return (
    <div className="card is-block ms-auto p-4">
      <div className="d-flex justify-content-start mb-4">
        <img className="seller-image me-3" src={SellerImg} alt="" />
        <div>
          <h4>Nama Penjual</h4>
          <p>Kota</p>
        </div>
      </div>
      <h4>Harga</h4>
      {getProductIdResult ? (
        <h3>Rp. {formatPrice(getProductIdResult.price)}</h3>
      ) : getProductIdLoading ? (
        <h3>Loading....</h3>
      ) : (
        <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
      )}
      <CheckButton
        isSeller={isSeller}
        id={id}
        getProductIdResult={getProductIdResult}
      />
    </div>
  );
}
