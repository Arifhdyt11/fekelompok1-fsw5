import { useSelector } from "react-redux";

export default function ProductTitle() {
  const { getProductIdResult, getProductIdLoading, getProductIdError } =
    useSelector((state) => state.ProductReducer);
  return (
    <>
      <section className="container section-title-product">
        <div className="product-title text-center">
          {getProductIdResult ? (
            <div>
              <h2>{getProductIdResult.name}</h2>
              <p>{getProductIdResult.Category.name}</p>
            </div>
          ) : getProductIdLoading ? (
            <h3>Loading....</h3>
          ) : (
            <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
          )}
        </div>
      </section>
    </>
  );
}
