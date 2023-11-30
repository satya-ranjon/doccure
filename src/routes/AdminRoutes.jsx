import { Navigate, useLocation } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import useAdmin from "../hooks/useAdmin";
import { Box, CircularProgress } from "@mui/material";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuthentication();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
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

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
