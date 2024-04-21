import AllProducts from "./components/AllProducts";
import Home from "./components/Home";
import Login from "./components/Login";
import MyCart from "./components/MyCart";
import SingleProduct from "./components/SingleProduct";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <AllProducts />,
        },
        {
          path: "products/:productId",
          element: <SingleProduct />,
        },
        {
          path: "carts/:userId",
          element: <MyCart />,
        },
        {
          path: "login",
          element: <Login />
        }
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
