import Button from "../../elements/Button";

export default function Product() {
  return (
    <>
      <section className="container section-product mt-0 mb-5">
        <div className="category mb-5">
          <h3>Kategori</h3>
          <div className="d-flex justify-content-start my-3">
            <Button
              className="btn active me-3"
              hasShadow
              isSecondary
              href="/"
              type="link"
            >
              Masuk
            </Button>
            <Button
              className="btn me-3"
              hasShadow
              isSecondary
              href="/filter?filter=Sneakers"
              type="link"
            >
              Sneakers
            </Button>
            <Button
              className="btn me-3"
              hasShadow
              isSecondary
              href="/filter?filter=Boots"
              type="link"
            >
              Boots
            </Button>
            <Button
              className="btn me-3"
              hasShadow
              isSecondary
              href="/filter?filter=Sports"
              type="link"
            >
              Sports
            </Button>
            <Button
              className="btn me-3"
              hasShadow
              isSecondary
              href="/filter?filter=Casual"
              type="link"
            >
              Casual
            </Button>
          </div>
        </div>
        <div className="product">
          <div class="row justify-content-center">
            <div class="col-3 card-product mx-3 p-3">
              <img
                src="./images/shoes-1.png"
                alt="Shoes-1"
                className="img-fluid mb-3"
              />
              <h4>Jordan 1 Retro High Obsidian UNC</h4>
              <p>Sneakers</p>
              <h4>Rp. 2.900.000</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}