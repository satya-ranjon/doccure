import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import districts from "../../data/districts.json";
import upazilasData from "../../data/upazilas.json";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import validate from "../../utils/registerValidate";
import useAuthentication from "../../hooks/useAuthentication";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const initialState = {
  name: "",
  email: "",
  bloodGroup: "",
  district: "",
  upazila: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [selectDistrictId, setSelectedDistrictId] = useState(null);
  const [selectProfilePic, setSelectProfilePic] = useState(null);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { registration, updateUserProfile } = useAuthentication();
  const axiosPublic = useAxiosPublic();

  let upazilas = upazilasData.filter(
    (item) => item.district_id === selectDistrictId
  );

  const handleProfilePic = () => {
    inputRef.current.click();
  };

  const formik = useFormik({
    initialValues: initialState,
    validate,
    onSubmit: async (values) => {
      if (!selectProfilePic) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Select Your Profile Pic",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (selectProfilePic) {
        const imageData = new FormData();
        imageData.append("image", selectProfilePic);
        const res = await axios.post(
          "https://api.imgbb.com/1/upload",
          imageData,
          {
            params: {
              key: import.meta.env.VITE_IMAGE_HOSTING_KEY, // Replace with your ImgBB API key
            },
          }
        );
        if (res.data.success) {
          registration(values.email, values.password)
            .then((result) => {
              updateUserProfile(values.name, res.data.data.display_url)
                .then((res) => {
                  axiosPublic
                    .post("/user", {
                      email: values.email,
                      bloodGroup: values.bloodGroup,
                      district: values.district,
                      upazila: values.upazila,
                    })
                    .then((res) => {
                      Swal.fire({
                        icon: "success",
                        title: "Your Account Create Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate("/");
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: error.code,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {/* Profile Picture  */}

        <div className=" flex justify-start w-full">
          <div className="overflow-hidden group relative w-32 flex justify-center items-center cursor-pointer  h-32 rounded-md bg-slate-200 py-2 ">
            <h1 className=" text-sm font-normal text-zinc-600 ">
              {selectProfilePic ? (
                <img
                  className="w-full h-full"
                  src={URL.createObjectURL(selectProfilePic)}
                  alt="selectPic"
                />
              ) : (
                <span> Upload Picture</span>
              )}
            </h1>
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={(e) => setSelectProfilePic(e.target.files[0])}
              className=" hidden"
              ref={inputRef}
            />
            <div className="  absolute top-0 left-0 right-0 bottom-0 rounded-md bg-slate-200 hidden group-hover:block ">
              <div
                onClick={handleProfilePic}
                className="flex justify-center items-center h-full w-full">
                <CloudUploadIcon />
              </div>
            </div>
          </div>
        </div>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                error={formik.errors.name ? true : false}
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                label={formik.errors.name || "Name"}
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                error={formik.errors.email ? true : false}
                label={formik.errors.email || "Email Address"}
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {formik.errors.bloodGroup ? (
                    <span className=" text-red-500">
                      {formik.errors.bloodGroup}
                    </span>
                  ) : (
                    "Blood Group"
                  )}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={formik.handleChange}
                  value={formik.values.bloodGroup}
                  error={formik.errors.bloodGroup ? true : false}
                  label="Blood Group"
                  name="bloodGroup">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="district-simple-select-label">
                  {formik.errors.district ? (
                    <span className=" text-red-500">
                      {formik.errors.district}
                    </span>
                  ) : (
                    "District"
                  )}
                </InputLabel>
                <Select
                  error={formik.errors.district ? true : false}
                  labelId="district-simple-select-label"
                  id="district-simple-select"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                  label="District"
                  name="district">
                  {districts.map((item) => (
                    <MenuItem
                      onClick={() => {
                        setSelectedDistrictId(item.id);
                      }}
                      key={item.id}
                      value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="upazila-simple-select-label">
                  {formik.errors.upazila ? (
                    <span className=" text-red-500">
                      {formik.errors.upazila}
                    </span>
                  ) : (
                    "Upazila"
                  )}
                </InputLabel>
                <Select
                  error={formik.errors.upazila ? true : false}
                  disabled={!selectDistrictId && !formik.errors.upazila && true}
                  labelId="upazila-simple-select-label"
                  id="upazila-simple-select"
                  onChange={formik.handleChange}
                  value={formik.values.upazila}
                  label="Upazila"
                  name="upazila">
                  {upazilas.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={formik.errors.password ? true : false}
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                label={formik.errors.password || "Password"}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={formik.errors.password ? true : false}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                name="confirmPassword"
                label={formik.errors.password || "Confirm Password"}
                type="password"
                id="confirm_password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className=" text-sky-600" to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
