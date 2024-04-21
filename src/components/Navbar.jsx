import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div id="navbar">
      <Link to="/" className="link">
        All Products
      </Link>
      <Link to="/carts/:userId" className="link">
        My Cart
      </Link>
      {token ? (
        null
      ) : (
        <Link to="/login" className="link">
          Login
        </Link>
      )}
      {token ? <button onClick={logout}>Logout</button> : null}
    </div>
  );
};
export default Navbar;
