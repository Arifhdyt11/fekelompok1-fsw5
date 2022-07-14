import Button from "elements/Button";
import { useSelector } from "react-redux";

export default function DescriptionProduct() {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
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

      {isAuthenticated ? (
        user.data.role === "SELLER" ? (
          getProductIdSellerResult ? ( //SELLER
            <p>{getProductIdSellerResult.description}</p>
          ) : getProductIdSellerLoading ? (
            <Button isLoading></Button>
          ) : (
            <p>
              {getProductIdSellerError
                ? getProductIdSellerError
                : "Please Reload or Try Again"}
            </p>
          )
        ) : getProductIdResult ? (
          <p> {getProductIdResult.description}</p>
        ) : getProductIdLoading ? (
          <Button isLoading></Button>
        ) : (
          <p>
            {getProductIdError
              ? getProductIdError
              : "Please Reload or Try Again"}
          </p>
        )
      ) : getProductIdResult ? (
        <p> {getProductIdResult.description}</p>
      ) : getProductIdLoading ? (
        <Button isLoading></Button>
      ) : (
        <p>
          {getProductIdError ? getProductIdError : "Please Reload or Try Again"}
        </p>
      )}
    </div>
  );
}
