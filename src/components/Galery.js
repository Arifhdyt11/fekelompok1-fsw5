import Button from "../elements/Button";
import Shadow from "../assets/images/shadow-img.png";
import Cover from "../assets/images/cover-img.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Galery() {
  return (
    <>
      <section className="container section-galery-product">
        <div className="row justify-content-between mx-5">
          <div className="col-5 px-4" style={{ height: 450 }}>
            <div className="img-product-big mb-4">
              <img
                src="../images/shoes-1.png"
                alt="Shoes-1"
                className="img-fluid shoes mb-3 position-absolute"
              />
              <img
                src={Cover}
                alt="Shadow"
                className="img-fluid mb-3 position-absolute"
                style={{ marginTop: 350 }}
              />
              <img
                src={Shadow}
                alt="Shadow"
                className="img-fluid mb-3 position-absolute"
                style={{ margin: "280px 0px 0px -50px" }}
              />
            </div>
          </div>
          <div className="col-7 px-5 align-self-center">
            <OwlCarousel
              className="mb-1"
              items={2}
              merge={true}
              loop={true}
              autoplay={true}
              autoplayTimeout={"2000"}
            >
              <div className="card-thumb">
                <Button hasShadow className="thumb-img">
                  <img
                    className=" img-fluid"
                    src="../images/shoes-1.png"
                    alt=""
                  />
                </Button>
              </div>
              <div className="card-thumb">
                <Button hasShadow className="thumb-img">
                  <img
                    className=" img-fluid"
                    src="../images/shoes-1.1.png"
                    alt=""
                  />
                </Button>
              </div>
              <div className="card-thumb">
                <Button hasShadow className="thumb-img">
                  <img
                    className=" img-fluid"
                    src="../images/shoes-1.2.png"
                    alt=""
                  />
                </Button>
              </div>
              <div className="card-thumb">
                <Button hasShadow className="thumb-img">
                  <img
                    className=" img-fluid"
                    src="../images/shoes-1.3.png"
                    alt=""
                  />
                </Button>
              </div>
            </OwlCarousel>
            <div className="size ms-2">
              <h3>Size Ready</h3>
              <div className="size-ready">
                <Button className="me-3" isSecondary>
                  40
                </Button>
                <Button className="me-3" isSecondary>
                  41
                </Button>
                <Button className="me-3" isSecondary>
                  42
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
