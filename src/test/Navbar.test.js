import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter as Router } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

window.scrollTo = jest.fn();

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("IconText", () => {
  it("Mengecek text narian", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getAllByText(/narian/)).toBeTruthy();
  });

  it("Mengecek text di Footer", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getAllByText(/Be Trend And In Style/)).toBeTruthy();
  });

  // const MOCK_SUBMIT_BTN = jest.fn();
  // it("Cek button di Footer ", () => {
  //   render(
  //     <Router>
  //       <Footer onSubmit={MOCK_SUBMIT_BTN} />
  //     </Router>
  //   );
  //   const btnRegist = screen.queryByTestId("footer");
  //   fireEvent.click(btnRegist);
  //   expect(MOCK_SUBMIT_BTN).toBeTruthy();
  // });
});
