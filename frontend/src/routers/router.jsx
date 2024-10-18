import { createBrowserRouter } from "react-router-dom";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <h1>Home</h1> },
      { path: "/orders", element: <h1>orders</h1> },
      { path: "/about", element: <h1>About</h1> },
      { path: "*", element: <h1>Page not found</h1> },
    ],
  },
]);

export default router;
