import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import SellerImg from "assets/images/seller-1.png";
import Button from "elements/Button";
import { formatPrice } from "utils/defaultFormat";
import { deleteProduct } from "store/actions/productAction";

export default function ActionDetail(props) {
  const { isSeller } = props;
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    getProductIdResult,
    getProductIdLoading,
    getProductIdError,
    deleteProductResult,
  } = useSelector((state) => state.ProductReducer);

  useEffect(() => {
    //Biar realtime pas delete
    if (deleteProductResult) {
      alert("Data Berhasil diapus");
      window.location.href = "/seller";
      dispatch(getProductIdResult(id));
    }
  }, [deleteProductResult, dispatch]);

  function CheckButton(props) {
    const { isSeller } = props;
    if (isSeller === "yes") {
      return (
        <>
          <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
            Terbitkan
          </Button>
          <Button
            className="btn mt-3 ms-auto py-2"
            isSecondary
            hasShadow
            isBlock
          >
            Edit
          </Button>
          <Button
            className="btn btn-danger mt-3 ms-auto py-2"
            hasShadow
            isBlock
            onClick={() => dispatch(deleteProduct(id))}
          >
            Delete
          </Button>
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
      <CheckButton isSeller={isSeller} />
    </div>
  );
}
