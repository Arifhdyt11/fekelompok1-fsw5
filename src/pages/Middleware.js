import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Middleware({ childern, role }) {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);

  return (
    <>
      {isAuthenticated ? (
        role === "BOTH" ? (
          childern
        ) : user.data.role === role ? (
          childern
        ) : (
          <Navigate to={`/401`} />
        )
      ) : (
        <Navigate to={`/403`} />
      )}
    </>
  );
}
