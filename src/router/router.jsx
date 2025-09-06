import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";
import App from "../App";
import FoodMenuPage from "../pages/menu/FoodMenuPage";
import AuthPage from "../pages/authPage/AuthPage";
import UserProfile from "../pages/authPage/UserProfile";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import CartPage from "../pages/cart/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/menu",
        element: <FoodMenuPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [],
      },
      { path: "/auth/user", element: <UserProfile /> },
      {},
    ],
  },
]);

export default router;
