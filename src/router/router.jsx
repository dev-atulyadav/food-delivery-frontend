import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";
import App from "../App";
import FoodMenuPage from "../pages/menu/FoodMenuPage";
import AuthPage from "../pages/authPage/AuthPage";
import UserProfile from "../pages/authPage/UserProfile";

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
        path: "/auth",
        element: <AuthPage />,
        children: [],
      },
      { path: "/auth/user", element: <UserProfile /> },
    ],
  },
]);

export default router;
