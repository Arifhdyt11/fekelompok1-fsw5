import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter as Router } from "react-router-dom";
import Navbar from "components/Navbar";

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
});
