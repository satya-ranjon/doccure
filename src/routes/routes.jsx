import AppWrapper from "../layout/AppWrapper";
import Login from "../pages/auth/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import Dashbord from "../pages/dashbord";
import Services from "../pages/service/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    // errorElement: <NotFound />,
    children: [
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
      {
        path: "/dashbord",
        element: <Dashbord />,
      },
    ],
  },
]);

export default router;
