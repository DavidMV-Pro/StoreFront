import Navbar from "./Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  //STATES
  //Authentication
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  //All products
  const [products, setProducts] = useState([]);

  // State for sorting direction (asc: ascending, desc: descending)
  const [sortDirection, setSortDirection] = useState("asc");

  //Max and min price
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  //Single Product
  const [product, setProduct] = useState({});

  //Product search
  const [searchQuery, setSearchQuery] = useState("");

  //Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});

  //Cart
  const [cart, setCart] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const contextObj = {
    values: {
      deleteMessage,
      checkoutMessage,
      userInfo,
      cart,
      error,
      minPrice,
      maxPrice,
      sortDirection,
      products,
      product,
      searchQuery,
      token,
      username,
      password,
    },
    setters: {
      setDeleteMessage,
      setCheckoutMessage,
      setUserInfo,
      setCart,
      setError,
      setMinPrice,
      setMaxPrice,
      setSortDirection,
      setProducts,
      setProduct,
      setSearchQuery,
      setToken,
      setUsername,
      setPassword,
    },
  };

  return (
    <div>
      
        <div className="fake-store-header">
          <div className="header-text">Fake Store</div>
        </div>
      
      <Navbar context={contextObj} token={token} setToken={setToken} />
      <Outlet context={contextObj} token={token} setToken={setToken} />
    </div>
  );
};

export default Home;
