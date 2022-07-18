import userEvent from "@testing-library/user-event";
import axios from "axios";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import Navbar from "components/Navbar";
import { Provider } from "react-redux";
import store from "../store";
import Register from "pages/Register";
import { MemoryRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "pages/Login";
window.scrollTo = jest.fn();

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("Signup", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("Check text", () => {
    render(
      <Router>
        <GoogleOAuthProvider>
          <Register />
        </GoogleOAuthProvider>
      </Router>
    );
    expect(screen.getAllByText("Daftar")).toBeTruthy();
  });

  it("Testing Name Register", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <GoogleOAuthProvider>
            <Register />
          </GoogleOAuthProvider>
        </Router>
      );
      const input = utils.getByTestId("input-nameUser");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "User" } });
    expect(input.value).toBe("User");
  });

  it("Testing Email Register", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <GoogleOAuthProvider>
            <Register />
          </GoogleOAuthProvider>
        </Router>
      );
      const input = utils.getByTestId("input-emailUser");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "user@gmail.com" } });
    expect(input.value).toBe("user@gmail.com");
  });

  it("Testing Password Register", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <GoogleOAuthProvider>
            <Register />
          </GoogleOAuthProvider>
        </Router>
      );
      const input = utils.getByTestId("input-passwordUser");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "iniPassword" } });
    expect(input.value).toBe("iniPassword");
  });

  it("Testing pilih role Register", () => {
    const { getByTestId, getAllByTestId } = render(
      <Router>
        <GoogleOAuthProvider>
          <Register />
        </GoogleOAuthProvider>
      </Router>
    );
    fireEvent.change(getByTestId("select-role"), {
      target: { value: "SELLER" },
    });
    let options = getAllByTestId("select-option");
    expect(options[0].selected).toBeTruthy();
    fireEvent.change(getByTestId("select-role"), {
      target: { value: "BUYER" },
    });
    expect(options[1].selected).toBeTruthy();
  });
});

describe("Login", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("Check text", () => {
    render(
      <Router>
        <GoogleOAuthProvider>
          <Login />
        </GoogleOAuthProvider>
      </Router>
    );
    expect(screen.getAllByText("Masuk")).toBeTruthy();
  });

  it("Testing Email Login", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <GoogleOAuthProvider>
            <Login />
          </GoogleOAuthProvider>
        </Router>
      );
      const input = utils.getByTestId("input-emailUserLogin");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "UserSeller@gmail.com" } });
    expect(input.value).toBe("UserSeller@gmail.com");
  });

  it("Testing Password Login", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <GoogleOAuthProvider>
            <Login />
          </GoogleOAuthProvider>
        </Router>
      );
      const input = utils.getByTestId("input-passwordUserLogin");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "iniPassword" } });
    expect(input.value).toBe("iniPassword");
  });
});
