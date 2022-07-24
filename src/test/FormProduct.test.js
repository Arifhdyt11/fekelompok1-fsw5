import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter as Router } from "react-router-dom";
import FormActionProduct from "pages/FormActionProduct";

window.scrollTo = jest.fn();

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("Form Produk", () => {
  it("Mengecek text Nama Produk", () => {
    render(
      <Router>
        <FormActionProduct />
      </Router>
    );
    expect(screen.getByText("Nama Produk")).toBeInTheDocument();
    expect(screen.getByText("Kategori")).toBeInTheDocument();
    expect(screen.getByText("Harga Produk")).toBeInTheDocument();
  });

  it("Testing Form Nama Produk", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <FormActionProduct />
        </Router>
      );
      const input = utils.getByTestId("input-namaProduk");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "Sepatu VANS" } });
    expect(input.value).toBe("Sepatu VANS");
  });

  it("Testing Form Harga Produk", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <FormActionProduct />
        </Router>
      );
      const input = utils.getByTestId("input-hargaProduk");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "1000000" } });
    expect(input.value).toBe("1000000");
  });

  it("Testing pilih role Register", () => {
    const { getByTestId, getAllByTestId } = render(
      <Router>
        <FormActionProduct />
      </Router>
    );
    fireEvent.change(getByTestId("select-pilihKategori"), {
      target: { value: "1" },
    });
    let options = getAllByTestId("select-kategori");
    expect(options[0].selected).toBeTruthy();
    fireEvent.change(getByTestId("select-pilihKategori"), {
      target: { value: "2" },
    });
    expect(options[1].selected).toBeTruthy();
  });

  it("Testing Form Deskripsi ", () => {
    const setup = () => {
      const utils = render(
        <Router>
          <FormActionProduct />
        </Router>
      );
      const input = utils.getByTestId("select-deskripsi");
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: "Ini sepatu bagus" } });
    expect(input.value).toBe("Ini sepatu bagus");
  });
});

// const isAdd = { isAdd: "yes" };
// function reducer(state = isAdd, action) {
//   switch (action.type) {
//     case "yes":
//       return { ...state, isAdd: state.isAdd };
//     default:
//       break;
//   }
// }

// function renderWithRedux(
//   component,
//   { initialState, store = createStore(reducer, initialState) } = {}
// ) {
//   return {
//     ...render(<Provider store={store}></Provider>),
//   };
// }

// it("Add Product", () => {
//   render(
//     <Router>
//       <FormActionProduct />
//     </Router>
//   );
//   const { getByTestId } = renderWithRedux(<FormActionProduct />);
//   expect(screen.queryByText(/Add Product/)).toBeInTheDocument();
// });
