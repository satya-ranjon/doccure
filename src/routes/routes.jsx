import AppWrapper from "../layout/AppWrapper";
import Login from "../pages/auth/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import Services from "../pages/service/Services";
import Home from "../pages/home/Home";
import AllTest from "../pages/service/AllTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-test",
        element: <AllTest />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/service",
        element: <Services />,
      },
    ],
  },
]);

export default router;
