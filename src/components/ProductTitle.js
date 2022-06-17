export default function ProductTitle({ dataProduct }) {
  return (
    <>
      <section className="container section-title-product">
        <div className="product-title text-center">
          <h2>{dataProduct.name}</h2>
          <p>{dataProduct.category}</p>
        </div>
      </section>
    </>
  );
}
