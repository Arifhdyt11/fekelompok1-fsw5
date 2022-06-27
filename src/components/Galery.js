import { useSelector } from "react-redux";

import Button from "elements/Button";
import Shadow from "assets/images/shadow-img.png";
import Pad from "assets/images/cover-img.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Galery() {
  const { getProductIdResult, getProductIdLoading, getProductIdError } =
    useSelector((state) => state.ProductReducer);
  return (
    <>
      <section className="container section-galery-product">
        <div className="row justify-content-between mx-lg-5">
          <div className="col-lg-5 col-sm-12 px-4">
            <div className="img-product-big mb-4 text-center">
              <img
                src={
                  getProductIdResult.image
                    ? `../images/${getProductIdResult.image[0]}`
                    : ""
                }
                alt={getProductIdResult.name}
                className="default-image shoes mb-n3"
              />
              <img src={Shadow} alt="Shadow" className="shadow-image mb-n5 " />
              <img src={Pad} alt="Pad" className="pad-image mb-3 " />
            </div>
          </div>
          <div className="col-lg-7 col-sm-12 px-5 align-self-center text-center">
            <OwlCarousel
              className="mb-1"
              merge={true}
              loop={true}
              autoplay={true}
              autoplayTimeout={"2000"}
              responsive={{
                0: {
                  items: 1,
                },
                540: {
                  items: 1,
                },
                960: {
                  items: 2,
                },
                1140: {
                  items: 2,
                },
              }}
            >
              {getProductIdResult.image
                ? getProductIdResult.image.map((item, index) => {
                    return (
                      <div className="card-thumb" key={index}>
                        <Button hasShadow className="thumb-img">
                          <img
                            className=" img-fluid"
                            src={`../images/${item}`}
                            alt=""
                          />
                        </Button>
                      </div>
                    );
                  })
                : "Loading...."}
            </OwlCarousel>
            <div className="size ms-2">
              <h3>Size Ready</h3>
              <div className="size-ready justify-content-center">
                <Button className="mx-2" isSecondary>
                  40
                </Button>
                <Button className="mx-2" isSecondary>
                  41
                </Button>
                <Button className="mx-2" isSecondary>
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
