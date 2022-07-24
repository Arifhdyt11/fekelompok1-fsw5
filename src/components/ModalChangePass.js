import Button from "elements/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "store/actions/changePassword";
import { handleSwal } from "utils/sweetAlert";

function ModalChangePass() {
  const { changePasswordLoading } = useSelector(
    (state) => state.ChangePasswordReducer
  );

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length <= 7) {
      handleSwal("Password cannot be less than 8!", "error");
    }
    if (password.length >= 8) {
      dispatch(
        changePassword({ oldPassword: oldPassword, password: password })
      );
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div
        className="modal fade"
        id="modalPassword"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              {changePasswordLoading ? (
                <Button className="btn" isPrimary isLoading></Button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalChangePass;
