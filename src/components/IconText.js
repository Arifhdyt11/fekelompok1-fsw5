import Button from "elements/Button";
import { useSelector } from "react-redux";

export default function IconText() {

  const { user, isAuthenticated } = useSelector((state) => state.AuthReducer);
  return (
    <Button
      className="brand-text-icon"
      href={ isAuthenticated? user.data.role ==="SELLER"? "/seller" : "/" : "/"}
      type="link"
    >
      Shoes<span className="text-gray-900">narian.</span>
    </Button>
  );
}
