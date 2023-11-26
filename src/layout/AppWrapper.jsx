import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const AppWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppWrapper;
