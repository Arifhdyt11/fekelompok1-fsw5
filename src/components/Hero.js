import Button from "elements/Button";
import ImageHero from "assets/images/img-hero.png";

export default function Hero(props) {
  function showCallToAction() {
    window.scrollTo({
      top: props.refCallToAction.current.offsetTop - 30,
      behavior: "smooth",
    });
  }
  return (
    <section className="container section-hero">
      <div className="row">
        <div className="col-auto pr-5 align-self-center" style={{ width: 530 }}>
          <h1 className="font-weight-bold line-height-1 mb-3">
            Be Trendy And <br />
            In Style
          </h1>
          <p
            className="mb-4 font-weight-light text-gray-500 w-75"
            style={{ lineHeight: "170%" }}
          >
            Explore the latest shoes for every sport, workout and everyday look.
            Built for ultimate performance and sneaker style.
          </p>
          <Button
            className="btn ms-auto px-3 py-2"
            hasShadow
            isPrimary
            onClick={showCallToAction}
          >
            Show Me Now
          </Button>
        </div>

        <div className="col-lg-6 col-md-12 text-center ">
          <img className="img-fluid" src={ImageHero} alt="Image Hero" />
        </div>
      </div>
    </section>
  );
}
