import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/cartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "*", element: <h1>Page not found</h1> },
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/orders", element: <h1>orders</h1> },
      { path: "/about", element: <h1>About</h1> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);

export default router;
