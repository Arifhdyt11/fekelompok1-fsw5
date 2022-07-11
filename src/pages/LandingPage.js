import "assets/css/landingPage.css";

import Navbar from "components/Navbar";
import Hero from "components/landingPage/Hero";
import Product from "components/landingPage/Product";
import Footer from "components/Footer";
import React, { Component } from "react";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.refCallToAction = React.createRef();
  }

  componentDidMount() {
    document.title = "Shoesnarian | Home";
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Hero refCallToAction={this.refCallToAction}></Hero>
        <Product refCallToAction={this.refCallToAction}></Product>
        <Footer></Footer>
      </>
    );
  }
}

export default LandingPage;
