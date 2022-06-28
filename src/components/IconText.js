import Button from "elements/Button";
import { useSelector } from "react-redux";

export default function IconText() {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <Button
      className="brand-text-icon"
      href={user.data.role === "SELLER" ? "/seller" : "/"}
      type="link"
    >
      Shoes<span className="text-gray-900">narian.</span>
    </Button>
  );
}
