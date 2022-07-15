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
      <div className="container mt-lg-4 mt-1  pb-1">
        <Button
          className="btn arrow-back position-absolute d-flex justify-content-center "
          nonStyle
          type="link"
          href={
            isAuthenticated
              ? user.data.role === "SELLER"
                ? "/seller"
                : "/"
              : "/"
          }
        >
          <i className="fa-solid fa-arrow-left-long fa-lg align-self-center me-4 mt-3"></i>
          <h6 className="m-0 mt-3 d-block d-md-none">Back to Home</h6>
        </Button>
      </div>
      <Fade bottom>
        <section className="container section-title-product pt-5 pt-md-0 mt-4 mt-md-1">
          <div className="product-title text-center px-md-5">
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
              ) : getProductIdResult ? ( //BUYER
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
            ) : getProductIdResult ? ( //NOT LOGEED IN
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
