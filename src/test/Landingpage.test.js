import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter as Router } from "react-router-dom";
import LandingPage from "pages/LandingPage";

window.scrollTo = jest.fn();

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("Hero", () => {
  it("Mengecek text Be Trendy And", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    expect(screen.queryByText(/Be Trendy And In Style/)).toBeInTheDocument();
    expect(screen.queryByText(/Kategori/)).toBeInTheDocument();
  });

  // const MOCK_SUBMIT_BTN = jest.fn();

  // it("Cek Button", () => {
  //   render(
  //     <Router>
  //       <Hero props={MOCK_SUBMIT_BTN} />
  //     </Router>
  //   );
  //   const buttonShow = screen.queryByTestId("btnShowMe");
  //   fireEvent.click(buttonShow);
  //   expect(MOCK_SUBMIT_BTN).toBeTruthy();
  // });
});
