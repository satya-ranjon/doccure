import AppWrapper from "../layout/AppWrapper";
import Login from "../pages/auth/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import Services from "../pages/service/Services";
import Home from "../pages/home/Home";
import AllTest from "../pages/service/AllTest";
import DashboardWrapper from "../layout/DashboardWrapper";
import MyProfile from "../pages/dashboard/myprofle/MyProfile";
import UpdateProfile from "../pages/dashboard/myprofle/UpdateProfile";
import TestResult from "../pages/dashboard/Appointments/TestResult";
import Users from "../pages/dashboard/user/Users";
import TestDetails from "../pages/service/TestDetails";
import CreateTest from "../pages/dashboard/test/CreateTest";
import AllTestAdmin from "../pages/dashboard/test/AllTest";
import UpdateTest from "../pages/dashboard/test/UpdateTest";
import AddBanner from "../pages/dashboard/addBanner/AddBanner";
import AllBanner from "../pages/dashboard/addBanner/AllBanner";
import UpdateBanner from "../pages/dashboard/addBanner/UpdateBanner";
import Payment from "../pages/dashboard/payment/Payment";
import MyUpcomingAppointments from "../pages/dashboard/Appointments/MyUpcomingAppointments";
import Reservation from "../pages/dashboard/reservation/Reservation";
import NotFound from "../pages/notfound/NotFound";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoutes";
import Contact from "../pages/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <NotFound />,
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
        path: "/tests/:id",
        element: <TestDetails />,
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
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardWrapper />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <MyProfile />,
      },
      { path: "profile-update", element: <UpdateProfile /> },
      { path: "test-result", element: <TestResult /> },
      { path: "my-appointments", element: <MyUpcomingAppointments /> },
      { path: "payment/:id", element: <Payment /> },
      {
        path: "banners",
        element: (
          <AdminRoutes>
            <AllBanner />
          </AdminRoutes>
        ),
      },
      {
        path: "reservation",
        element: (
          <AdminRoutes>
            <Reservation />
          </AdminRoutes>
        ),
      },
      {
        path: "add-banner",
        element: (
          <AdminRoutes>
            <AddBanner />
          </AdminRoutes>
        ),
      },
      {
        path: "edit-banner/:id",
        element: (
          <AdminRoutes>
            <UpdateBanner />
          </AdminRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoutes>
            <Users />
          </AdminRoutes>
        ),
      },
      {
        path: "add-test",
        element: (
          <AdminRoutes>
            <CreateTest />
          </AdminRoutes>
        ),
      },
      {
        path: "all-test",
        element: (
          <AdminRoutes>
            <AllTestAdmin />
          </AdminRoutes>
        ),
      },
      {
        path: "edit-test/:id",
        element: (
          <AdminRoutes>
            <UpdateTest />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
