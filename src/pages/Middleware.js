import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Middleware({ childern }) {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <>{user.data.role === "SELLER" ? childern : <Navigate to={`/403`} />}</>
  );
}
