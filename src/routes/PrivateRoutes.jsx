import { Navigate, useLocation } from "react-router";
import useAuthentication from "../hooks/useAuthentication";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthentication();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "600px",
          alignItems: "center",
        }}>
        <CircularProgress size={180} />
      </Box>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
