import Button from "elements/Button";
import { getInitialData } from "json/data.js";
import img from "assets/images/ilustrasi.svg";

export default function Product(props) {
  return (
    <>
      <section className="container section-product mt-2 mb-5">
        <div className="filter mb-5">
          <h3>Kategori</h3>
          <div className="justify-content-start my-2">
            <Button
              className="btn active btn-filter me-3 my-2"
              hasShadow
              isSecondary
              href="/"
              type="link"
              onClick={() => props.setProduct(getInitialData())}
            >
              All
            </Button>

            {props.menuItems.map((kategori, index) => {
              return (
                <Button
                  className="btn btn-filter me-3 my-2"
                  hasShadow
                  isSecondary
                  href=""
                  type="link"
                  onClick={() => props.filterItem(kategori)}
                  key={index}
                >
                  {kategori}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="product">
          <div className="row justify-content-center">
            {props.data.length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            ) : (
              props.data.map((item) => {
                return (
                  <Button
                    type="link"
                    href={`/product/${item.id}`}
                    className="col-lg-3 col-md-6 col-sm-12  "
                    style={{ textDecoration: "none" }}
                    key={item.id}
                  >
                    <div className="card-product p-3 mb-4">
                      <img
                        src={item.image}
                        alt="Shoes-1"
                        className="img-fluid mb-3"
                      />
                      <div className="product-name">
                        <h4>{item.name.substring(0, 50)}</h4>
                      </div>
                      <p>{item.category}</p>
                      <h4>Rp. {item.price}</h4>
                    </div>
                  </Button>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
