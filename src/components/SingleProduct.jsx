import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSingleProduct } from "../AjaxHandlers";

const SingleProduct = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1); // State for quantity

  // States
  const {
    values: { product },
    setters: { setProduct },
  } = useOutletContext();

  useEffect(() => {
    fetchSingleProduct(productId, setProduct);
  }, []);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Logic to add the product to cart with selected quantity
    console.log("Product added to cart with quantity:", quantity);
  };

  return (
    <div className="single-product-container">
      <div className="singleProduct-image">
        <img src={product.image} width={300} alt={product.title} />
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <select id="quantity" value={quantity} onChange={handleQuantityChange}>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
