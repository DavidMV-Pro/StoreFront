import { Link, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../AjaxHandlers";

const AllProducts = () => {
  //States
  const {
    values: { products, searchQuery, sortDirection, minPrice, maxPrice, },
    setters: { setProducts, setSearchQuery, setSortDirection, setMinPrice, setMaxPrice, setCheckoutMessage, setDeleteMessage },
  } = useOutletContext();

  useEffect(() => {
    fetchProducts(setProducts);
    setCheckoutMessage("")
    setDeleteMessage("")
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSort = () => {
    // Toggle sort direction when the button is clicked
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const minPriceMatch = minPrice === "" || parseFloat(product.price) >= parseFloat(minPrice);
    const maxPriceMatch = maxPrice === "" || parseFloat(product.price) <= parseFloat(maxPrice);
    return titleMatch && minPriceMatch && maxPriceMatch;
  });

  // Sort products based on price and direction
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
  });


  console.log("Products State:", products);
  return (
    <div className="products-container">
  <div className="product-controls">
    <input
      type="text"
      placeholder="Search by title"
      value={searchQuery}
      onChange={handleSearch}
      className="search-input"
    />
    <div className="price-inputs">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={handleMinPriceChange}
        className="price-input"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        className="price-input"
      />
    </div>
    <button onClick={handleSort} className="sort-button">
      {sortDirection === "asc" ? "Low to High" : "High to Low"}
    </button>
  </div>
  <div className="product-list">
    {sortedProducts.length > 0 ? (
      sortedProducts.map((product) => (
        <div key={product.id} className="product-item">
          <Link to={`products/${product.id}`} className="product-link">
            <div className="product-info">
              <img src={product.image} alt={product.title} className="product-image" />
              <div>{product.title}</div>
              <div>${product.price}</div>
            </div>
          </Link>
          <button>Add to cart</button>
        </div>
      ))
    ) : (
      <div>No products found!</div>
    )}
  </div>
</div>

  );
};

export default AllProducts;
