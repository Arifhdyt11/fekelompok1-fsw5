import { useSelector } from "react-redux";

function ProductHeader() {
  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <div className="content-header">
      <div className="header-title">
        <h3>Daftar Jual Saya</h3>
      </div>
      <div className="card p-4 is-block">
        <div className="d-flex justify-content-start">
          <img className="seller-image me-3" src={user.data.image} alt="" />
          <div>
            <h4>{user.data.name}</h4>
            {user.data.name === null ||
            user.data.city === null ||
            user.data.phone === null ? (
              <p style={{ color: "red", fontWeight: 500 }}>
                Update Profile Required to Add Product!!!
              </p>
            ) : (
              <p>{user.data.city}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;
