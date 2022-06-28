import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Middleware({ childern }) {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  return (
    <>
      {isAuthenticated ? (
        user.data.role === "SELLER" ? (
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
