import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "store/actions/changePassword";

function ModalChangePass() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  // const { changePasswordResult } = useSelector(
  //   (state) => state.ChangePasswordReducer
  // );
  const { user } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  console.log(user.data.password);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changePassword({ oldPassword: oldPassword, password: password }));
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div
        class="modal fade"
        id="modalPassword"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Current Password</label>
                <input
                  type="password"
                  class="form-control"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {/* <div class="mb-3">
                <label class="form-label">Confirm New Password</label>
                <input type="password" class="form-control" />
              </div> */}
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalChangePass;
