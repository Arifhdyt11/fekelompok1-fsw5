import reducers from "../store/reducers";
import {
  render as rtlRender,
  screen,
  fireEvent,
  queryAllByText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import ProfilePage from "pages/Profile";
import store from "../store";

test("reducers", () => {
  let state;
  state = reducers(
    {
      RegisterReducer: {
        addRegisterResult: false,
        addRegisterLoading: false,
        addRegisterError: false,
      },
      AuthReducer: {
        isAuthenticated: true,
        isAuthenticatedLoading: false,
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoiYXVkaW1hc2VsbGVyQGdtYWlsLmNvbSIsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE2NTg2Mjk4ODksImV4cCI6MTY1OTIzNDY4OX0.xYpq3MZJeTkxqc2CiT2nkwN2EBBiu_hj3_ShrOCqCcU",
        user: {
          status: true,
          message: "Successfully find data user",
          data: {
            id: 21,
            role: "SELLER",
            name: "Audima",
            email: "audimaseller@gmail.com",
            googleId: null,
            registeredVia: "auth-form",
            emailVerifiedAt: null,
            status: "inactive",
            province: "36",
            city: "KABUPATEN SERANG",
            address: "YA",
            phone: "6213103104561",
            image:
              "https://ui-avatars.com/api/?name=Audima&background=4e73df&color=ffffff&size=100",
          },
        },
        error: null,
        loadingUpdate: false,
      },
      ChangePasswordReducer: {
        changePasswordResult: false,
        changePasswordLoading: false,
        changePasswordError: false,
      },
      CategoryReducer: {
        getListCategoryResult: false,
        getListCategoryLoading: false,
        getListCategoryError: false,
      },
      ProductReducer: {
        getListProductResult: false,
        getListProductLoading: false,
        getListProductError: false,
        getProductIdResult: false,
        getProductIdLoading: false,
        getProductIdError: false,
        getListProductSellerResult: false,
        getListProductSellerLoading: false,
        getListProductSellerError: false,
        getProductSellerIdResult: false,
        getProductSellerIdLoading: false,
        getProductSellerIdError: false,
        addProductResult: false,
        addProductLoading: false,
        addProductError: false,
        updateProductResult: false,
        updateProductLoading: false,
        updateProductError: false,
        deleteProductResult: false,
        deleteProductLoading: false,
        deleteProductError: false,
      },
      SizeReducer: {
        getListSizeResult: false,
        getListSizeLoading: false,
        getListSizeError: false,
        addSizeResult: false,
        addSizeLoading: false,
        addSizeError: false,
        detailSizeResult: false,
        deleteSizeResult: false,
        deleteSizeLoading: false,
        deleteSizeError: false,
        updateSizeResult: false,
        updateSizeLoading: false,
        updateSizeError: false,
      },
      WishlistReducer: {
        getListWishlistSellerResult: false,
        getListWishlistSellerLoading: false,
        getListWishlistSellerError: false,
        getListWishlistBuyerResult: false,
        getListWishlistBuyerLoading: false,
        getListWishlistBuyerError: false,
        addWishlistResult: false,
        addWishlistLoading: false,
        addWishlistError: false,
        deleteWishlistResult: false,
        deleteWishlistLoading: false,
        deleteWishlistError: false,
      },
      TransactionReducer: {
        getListTransactionBuyerResult: false,
        getListTransactionBuyerLoading: false,
        getListTransactionBuyerError: false,
        getListTransactionSellerResult: false,
        getListTransactionSellerLoading: false,
        getListTransactionSellerError: false,
        getTransactionIdSellerResult: false,
        getTransactionIdSellerLoading: false,
        getTransactionIdSellerError: false,
        addTransactionResult: false,
        addTransactionLoading: false,
        addTransactionError: false,
        updateTransactionSellerResult: false,
        updateTransactionSellerLoading: false,
        updateTransactionSellerError: false,
      },
      NotificationReducer: {
        getNotificationBuyerResult: false,
        getNotificationBuyerLoading: false,
        getNotificationBuyerError: false,
        getNotificationSellerResult: false,
        getNotificationSellerLoading: true,
        getNotificationSellerError: false,
        updateNotificationBuyerResult: false,
        updateNotificationBuyerLoading: false,
        updateNotificationBuyerError: false,
        updateNotificationSellerResult: false,
        updateNotificationSellerLoading: false,
        updateNotificationSellerError: false,
      },
      CityReducer: {
        getProvinsiResult: false,
        getProvinsiLoading: true,
        getProvinsiError: false,
        getKotaResult: [
          { id: "3601", province_id: "36", name: "KABUPATEN PANDEGLANG" },
          { id: "3602", province_id: "36", name: "KABUPATEN LEBAK" },
          { id: "3603", province_id: "36", name: "KABUPATEN TANGERANG" },
          { id: "3604", province_id: "36", name: "KABUPATEN SERANG" },
          { id: "3671", province_id: "36", name: "KOTA TANGERANG" },
          { id: "3672", province_id: "36", name: "KOTA CILEGON" },
          { id: "3673", province_id: "36", name: "KOTA SERANG" },
          { id: "3674", province_id: "36", name: "KOTA TANGERANG SELATAN" },
        ],
        getKotaLoading: false,
        getKotaError: false,
      },
    },
    {
      type: "GET_PROVINSI",
      payload: {
        loading: false,
        data: [
          { id: "11", name: "ACEH" },
          { id: "12", name: "SUMATERA UTARA" },
          { id: "13", name: "SUMATERA BARAT" },
          { id: "14", name: "RIAU" },
          { id: "15", name: "JAMBI" },
          { id: "16", name: "SUMATERA SELATAN" },
          { id: "17", name: "BENGKULU" },
          { id: "18", name: "LAMPUNG" },
          { id: "19", name: "KEPULAUAN BANGKA BELITUNG" },
          { id: "21", name: "KEPULAUAN RIAU" },
          { id: "31", name: "DKI JAKARTA" },
          { id: "32", name: "JAWA BARAT" },
          { id: "33", name: "JAWA TENGAH" },
          { id: "34", name: "DI YOGYAKARTA" },
          { id: "35", name: "JAWA TIMUR" },
          { id: "36", name: "BANTEN" },
          { id: "51", name: "BALI" },
          { id: "52", name: "NUSA TENGGARA BARAT" },
          { id: "53", name: "NUSA TENGGARA TIMUR" },
          { id: "61", name: "KALIMANTAN BARAT" },
          { id: "62", name: "KALIMANTAN TENGAH" },
          { id: "63", name: "KALIMANTAN SELATAN" },
          { id: "64", name: "KALIMANTAN TIMUR" },
          { id: "65", name: "KALIMANTAN UTARA" },
          { id: "71", name: "SULAWESI UTARA" },
          { id: "72", name: "SULAWESI TENGAH" },
          { id: "73", name: "SULAWESI SELATAN" },
          { id: "74", name: "SULAWESI TENGGARA" },
          { id: "75", name: "GORONTALO" },
          { id: "76", name: "SULAWESI BARAT" },
          { id: "81", name: "MALUKU" },
          { id: "82", name: "MALUKU UTARA" },
          { id: "91", name: "PAPUA BARAT" },
          { id: "94", name: "PAPUA" },
        ],
        errorMessage: false,
      },
    }
  );
  expect(state).toEqual({
    RegisterReducer: {
      addRegisterResult: false,
      addRegisterLoading: false,
      addRegisterError: false,
    },
    AuthReducer: {
      isAuthenticated: true,
      isAuthenticatedLoading: false,
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoiYXVkaW1hc2VsbGVyQGdtYWlsLmNvbSIsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE2NTg2Mjk4ODksImV4cCI6MTY1OTIzNDY4OX0.xYpq3MZJeTkxqc2CiT2nkwN2EBBiu_hj3_ShrOCqCcU",
      user: {
        status: true,
        message: "Successfully find data user",
        data: {
          id: 21,
          role: "SELLER",
          name: "Audima",
          email: "audimaseller@gmail.com",
          googleId: null,
          registeredVia: "auth-form",
          emailVerifiedAt: null,
          status: "inactive",
          province: "36",
          city: "KABUPATEN SERANG",
          address: "YA",
          phone: "6213103104561",
          image:
            "https://ui-avatars.com/api/?name=Audima&background=4e73df&color=ffffff&size=100",
        },
      },
      error: null,
      loadingUpdate: false,
    },
    ChangePasswordReducer: {
      changePasswordResult: false,
      changePasswordLoading: false,
      changePasswordError: false,
    },
    CategoryReducer: {
      getListCategoryResult: false,
      getListCategoryLoading: false,
      getListCategoryError: false,
    },
    ProductReducer: {
      getListProductResult: false,
      getListProductLoading: false,
      getListProductError: false,
      getProductIdResult: false,
      getProductIdLoading: false,
      getProductIdError: false,
      getListProductSellerResult: false,
      getListProductSellerLoading: false,
      getListProductSellerError: false,
      getProductSellerIdResult: false,
      getProductSellerIdLoading: false,
      getProductSellerIdError: false,
      addProductResult: false,
      addProductLoading: false,
      addProductError: false,
      updateProductResult: false,
      updateProductLoading: false,
      updateProductError: false,
      deleteProductResult: false,
      deleteProductLoading: false,
      deleteProductError: false,
    },
    SizeReducer: {
      getListSizeResult: false,
      getListSizeLoading: false,
      getListSizeError: false,
      addSizeResult: false,
      addSizeLoading: false,
      addSizeError: false,
      detailSizeResult: false,
      deleteSizeResult: false,
      deleteSizeLoading: false,
      deleteSizeError: false,
      updateSizeResult: false,
      updateSizeLoading: false,
      updateSizeError: false,
    },
    WishlistReducer: {
      getListWishlistSellerResult: false,
      getListWishlistSellerLoading: false,
      getListWishlistSellerError: false,
      getListWishlistBuyerResult: false,
      getListWishlistBuyerLoading: false,
      getListWishlistBuyerError: false,
      addWishlistResult: false,
      addWishlistLoading: false,
      addWishlistError: false,
      deleteWishlistResult: false,
      deleteWishlistLoading: false,
      deleteWishlistError: false,
    },
    TransactionReducer: {
      getListTransactionBuyerResult: false,
      getListTransactionBuyerLoading: false,
      getListTransactionBuyerError: false,
      getListTransactionSellerResult: false,
      getListTransactionSellerLoading: false,
      getListTransactionSellerError: false,
      getTransactionIdSellerResult: false,
      getTransactionIdSellerLoading: false,
      getTransactionIdSellerError: false,
      addTransactionResult: false,
      addTransactionLoading: false,
      addTransactionError: false,
      updateTransactionSellerResult: false,
      updateTransactionSellerLoading: false,
      updateTransactionSellerError: false,
    },
    NotificationReducer: {
      getNotificationBuyerResult: false,
      getNotificationBuyerLoading: false,
      getNotificationBuyerError: false,
      getNotificationSellerResult: false,
      getNotificationSellerLoading: true,
      getNotificationSellerError: false,
      updateNotificationBuyerResult: false,
      updateNotificationBuyerLoading: false,
      updateNotificationBuyerError: false,
      updateNotificationSellerResult: false,
      updateNotificationSellerLoading: false,
      updateNotificationSellerError: false,
    },
    CityReducer: {
      getProvinsiResult: [
        { id: "11", name: "ACEH" },
        { id: "12", name: "SUMATERA UTARA" },
        { id: "13", name: "SUMATERA BARAT" },
        { id: "14", name: "RIAU" },
        { id: "15", name: "JAMBI" },
        { id: "16", name: "SUMATERA SELATAN" },
        { id: "17", name: "BENGKULU" },
        { id: "18", name: "LAMPUNG" },
        { id: "19", name: "KEPULAUAN BANGKA BELITUNG" },
        { id: "21", name: "KEPULAUAN RIAU" },
        { id: "31", name: "DKI JAKARTA" },
        { id: "32", name: "JAWA BARAT" },
        { id: "33", name: "JAWA TENGAH" },
        { id: "34", name: "DI YOGYAKARTA" },
        { id: "35", name: "JAWA TIMUR" },
        { id: "36", name: "BANTEN" },
        { id: "51", name: "BALI" },
        { id: "52", name: "NUSA TENGGARA BARAT" },
        { id: "53", name: "NUSA TENGGARA TIMUR" },
        { id: "61", name: "KALIMANTAN BARAT" },
        { id: "62", name: "KALIMANTAN TENGAH" },
        { id: "63", name: "KALIMANTAN SELATAN" },
        { id: "64", name: "KALIMANTAN TIMUR" },
        { id: "65", name: "KALIMANTAN UTARA" },
        { id: "71", name: "SULAWESI UTARA" },
        { id: "72", name: "SULAWESI TENGAH" },
        { id: "73", name: "SULAWESI SELATAN" },
        { id: "74", name: "SULAWESI TENGGARA" },
        { id: "75", name: "GORONTALO" },
        { id: "76", name: "SULAWESI BARAT" },
        { id: "81", name: "MALUKU" },
        { id: "82", name: "MALUKU UTARA" },
        { id: "91", name: "PAPUA BARAT" },
        { id: "94", name: "PAPUA" },
      ],
      getProvinsiLoading: false,
      getProvinsiError: false,
      getKotaResult: [
        { id: "3601", province_id: "36", name: "KABUPATEN PANDEGLANG" },
        { id: "3602", province_id: "36", name: "KABUPATEN LEBAK" },
        { id: "3603", province_id: "36", name: "KABUPATEN TANGERANG" },
        { id: "3604", province_id: "36", name: "KABUPATEN SERANG" },
        { id: "3671", province_id: "36", name: "KOTA TANGERANG" },
        { id: "3672", province_id: "36", name: "KOTA CILEGON" },
        { id: "3673", province_id: "36", name: "KOTA SERANG" },
        { id: "3674", province_id: "36", name: "KOTA TANGERANG SELATAN" },
      ],
      getKotaLoading: false,
      getKotaError: false,
    },
  });
});

window.scrollTo = jest.fn();

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

it("Testing Form Nama Profile", () => {
  const setup = () => {
    const utils = render(
      <Router>
        <ProfilePage />
      </Router>
    );
    const input = utils.getByTestId("input-namaProfile");
    return {
      input,
      ...utils,
    };
  };
  const { input } = setup();
  fireEvent.change(input, { target: { value: "Nama User" } });
  expect(input.value).toBe("Nama User");
});

// it("Testing pilih Provinsi", () => {
//   render(
//     <Router>
//       <ProfilePage />
//     </Router>
//   );
//   fireEvent.change(screen.getByTestId("select-role"), {
//     target: { value: "ACEH" },
//   });
//   expect(screen.queryByText("ACEH")).toBeTruthy();
// });

it("Testing Form Alamat Profile", () => {
  const setup = () => {
    const utils = render(
      <Router>
        <ProfilePage />
      </Router>
    );
    const input = utils.getByTestId("input-alamatProfile");
    return {
      input,
      ...utils,
    };
  };
  const { input } = setup();
  fireEvent.change(input, { target: { value: "Jakarta Timur" } });
  expect(input.value).toBe("Jakarta Timur");
});
