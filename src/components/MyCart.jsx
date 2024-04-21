import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserCart, deleteCart1 } from "../AjaxHandlers";

const MyCart = () => {
  //States
  const {
    values: { token, cart, deleteMessage, checkoutMessage },
    setters: { setCart, setDeleteMessage, setCheckoutMessage },
  } = useOutletContext();

  useEffect(() => {
    if (token) {
      fetchUserCart(token, setCart);
    }
  }, [token, setCart]);

  const deleteAllProducts = () => {
    setCart({})
    setDeleteMessage("All items have been deleted")
  };

  const handleCheckout = () => {
    setCart({})
    setCheckoutMessage("Items have been checked out")
  };

  return (
    <div className="cart-container">
    <h2>{token ? "My Cart" : "Sign in to view cart"}</h2>
    {token && cart &&
      cart.products && (
        <div className="cart-details">
          <div className="cart-info">
            <div>Cart ID: {cart.id}</div>
            <div>User ID: {cart.userId}</div>
            <div>Date: {cart.date}</div>
          </div>
          <div className="cart-products">
            <h3>Products:</h3>
            <ul>
              {cart.products.map((product) => (
                <li key={product.productId}>
                  Product ID: {product.productId}, Quantity:{" "}
                  {product.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-buttons">
            <button onClick={deleteAllProducts}>Delete All</button>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    <div className="messages">
      <p>{deleteMessage}</p>
      <p>{checkoutMessage}</p>
    </div>
  </div>
  );
};

export default MyCart;
