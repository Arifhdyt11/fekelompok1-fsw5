import Button from "elements/Button";
import { useSelector } from "react-redux";

import Fade from "react-reveal/Fade";

export default function ProductTitle() {
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
    <>
      <Fade bottom>
        <section className="container section-title-product">
          <div className="product-title text-center">
            {isAuthenticated ? (
              user.data.role === "SELLER" ? (
                getProductIdSellerResult ? ( //SELLER
                  <div>
                    <h2>{getProductIdSellerResult.name}</h2>
                    <p>{getProductIdSellerResult.categories.name}</p>
                  </div>
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
                <div>
                  <h2>{getProductIdResult.name}</h2>
                  <p>{getProductIdResult.categories.name}</p>
                </div>
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
              <div>
                <h2>{getProductIdResult.name}</h2>
                <p>{getProductIdResult.categories.name}</p>
              </div>
            ) : getProductIdLoading ? (
              <Button isLoading></Button>
            ) : (
              <p>
                {getProductIdError
                  ? getProductIdError
                  : "Please Reload or Try Again"}
              </p>
            )}
          </div>
        </section>
      </Fade>
    </>
  );
}
