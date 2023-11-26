import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuthentication = () => {
  return useContext(AuthContext);
};

export default useAuthentication;
