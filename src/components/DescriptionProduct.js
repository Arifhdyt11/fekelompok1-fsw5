import { useSelector } from "react-redux";

export default function DescriptionProduct() {
  const { user } = useSelector((state) => state.AuthReducer);
  const {
    getProductIdResult,
    getProductIdLoading,
    getProductIdError,

    getProductIdSellerResult,
    getProductIdSellerLoading,
    getProductIdSellerError,
  } = useSelector((state) => state.ProductReducer);

  return (
    <div className="description-product pe-3">
      <h3 className="text-center">About The Shoes</h3>

      {user.data.role === "SELLER" ? (
        getProductIdSellerResult ? ( //SELLER
          <p>{getProductIdSellerResult.description}</p>
        ) : getProductIdSellerLoading ? (
          <h3>Loading....</h3>
        ) : (
          <p>
            {getProductIdSellerError ? getProductIdSellerError : "Data Kosong"}
          </p>
        )
      ) : getProductIdResult ? (
        <p> {getProductIdResult.description}</p>
      ) : getProductIdLoading ? (
        <h3>Loading....</h3>
      ) : (
        <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
      )}
    </div>
  );
}
