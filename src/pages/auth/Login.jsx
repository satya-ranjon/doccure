import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import useAuthentication from "../../hooks/useAuthentication";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }

  return errors;
};

export default function SignUp() {
  const { login } = useAuthentication();
  const navigate = useNavigate();
  const { state } = useLocation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: async (values) => {
      login(values.email, values.password)
        .then((result) => {
          Swal.fire({
            icon: "success",
            title: "You Have Successfully Login!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(state ? state : "/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Your email and password doesn't match",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label={formik.errors.email || "Email Address"}
                error={formik.errors.email ? true : false}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                label={formik.errors.password || "Password"}
                error={formik.errors.password ? true : false}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" className=" text-sky-600">
                Already have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
