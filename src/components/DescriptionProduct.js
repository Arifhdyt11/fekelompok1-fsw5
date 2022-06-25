import { useSelector } from "react-redux";

export default function DescriptionProduct() {
  const { getProductIdResult, getProductIdLoading, getProductIdError } =
    useSelector((state) => state.ProductReducer);

  return (
    <div className="description-product pe-3">
      <h3 className="text-center">About The Shoes</h3>
      <p>{getProductIdResult.description}</p>
    </div>
  );
}
