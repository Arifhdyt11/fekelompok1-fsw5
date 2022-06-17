export default function DescriptionProduct({ dataProduct }) {
  return (
    <div className="description-product pe-3">
      <h3 className="text-center">About The Shoes</h3>
      <p>{dataProduct.description}</p>
    </div>
  );
}
