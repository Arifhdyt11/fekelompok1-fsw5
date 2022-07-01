import Button from "elements/Button";
import { useSelector } from "react-redux";

export default function IconText() {
  const { user } = useSelector((state) => state.AuthReducer);
  console.log("icontext", user);
  return (
    <Button
      className="brand-text-icon"
      href={user === "SELLER" ? "/seller" : "/"}
      type="link"
    >
      Shoes<span className="text-gray-900">narian.</span>
    </Button>
  );
}
