// It gave me an error saying that origin has been blocked by CORS poplicy so I had to use this method to be able to make requests to the API
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://fakestoreapi.com";
// const API = proxyUrl + apiUrl;

const API = apiUrl

//Fetch all products
export const fetchProducts = async (setProducts) => {
  try {
    const response = await fetch(`${API}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const productsData = await response.json();
    console.log("Product Data:", productsData); // Log the products data
    return setProducts(productsData); // Set products directly to the array of objects
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

//Fetch single product
export const fetchSingleProduct = async (productId, setProduct) => {
  try {
    const response = await fetch(`${API}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch single book");
    }
    const singleProductData = await response.json();
    return setProduct(singleProductData); 
  } catch (error) {
    console.error("Error fetching single book:", error); 
  }
};

// Log in
export const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.message}`);
    }

    const authToken = await response.json();
    return authToken;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(`Login failed: ${error.message}`);
  }
};

//Fetches user 1 cart
export const fetchUserCart = async (token, setCart) => {
  try {
    const response = await fetch(`${API}/carts/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const cartData = await response.json();
    console.log("Cart Data:", cartData);
    return setCart(cartData);
  } catch (error) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
};

//Fetch user 1
export const fetchUser = async (setUserInfo) => {
  try {
    const response = await fetch(`${API}/users/1`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const userData = await response.json();
    console.log("User Data:", userData);
    return setUserInfo(userData);
  } catch (error) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
};

//Delete user 1 cart
export const deleteCart1 = async (setCart, token) => {
  try {
    const response = await fetch(`${API}/carts/1`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const deletedCart = await response.json()
    return setCart(deletedCart)
  } catch (error) {
    throw new Error(`Failed to delete reservation: ${error.message}`);
  }
};