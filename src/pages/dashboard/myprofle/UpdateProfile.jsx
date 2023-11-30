import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import districts from "../../../data/districts.json";
import upazilasData from "../../../data/upazilas.json";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import useAuthentication from "../../../hooks/useAuthentication";
import DashboardContainer from "../../../components/common/DashboardContainer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.bloodGroup) {
    errors.bloodGroup = "Blood Group is Required";
  }
  if (!values.district) {
    errors.district = "District is Required";
  }
  if (!values.upazila) {
    errors.upazila = "Upazila is Required";
  }

  return errors;
};

const initialState = {
  name: "",
  email: "",
  bloodGroup: "",
  district: "",
  upazila: "",
};

export default function Register() {
  const [selectProfilePic, setSelectProfilePic] = useState(null);
  const [upazilaState, setUpazila] = useState([]);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/user-profile")
      .then((res) => {
        setData(res.data);
        // setSelectProfilePic(res.data.avatar);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const { updateUserProfile } = useAuthentication();

  const handleProfilePic = () => {
    inputRef.current.click();
  };

  const formik = useFormik({
    initialValues: initialState,
    validate,
    onSubmit: async (values) => {
      console.log(values);

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
          const imageUrl = res.data.data.display_url;
          updateUserProfile(values.name, imageUrl)
            .then((res) => {
              axiosSecure
                .put("/update-profile", {
                  name: values.name,
                  avatar: imageUrl,
                  bloodGroup: values.bloodGroup,
                  district: values.district,
                  upazila: values.upazila,
                })
                .then((res) => {
                  Swal.fire({
                    icon: "success",
                    title: "Successfully Update",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/dashboard/profile");
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return;
      }
      updateUserProfile(values.name, data?.avatar)
        .then((res) => {
          axiosSecure
            .put("/update-profile", {
              name: values.name,
              avatar: data?.avatar,
              bloodGroup: values.bloodGroup,
              district: values.district,
              upazila: values.upazila,
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Successfully Update",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashboard/profile");
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    if (!loading && data?._id) {
      formik.setValues({
        name: data?.name,
        email: data?.email,
        bloodGroup: data?.bloodGroup,
        district: data?.district,
        upazila: data?.upazila,
      });
    }
  }, [loading, data]);

  useEffect(() => {
    if (formik.values.district) {
      const findDistrictID = districts.find(
        (item) => item.name === formik.values.district
      );
      if (findDistrictID.id) {
        const findUpazils = upazilasData?.filter(
          (item) => item.district_id === findDistrictID.id
        );
        if (findUpazils?.length > 0) {
          setUpazila(findUpazils);
        }
      }
    }
  }, [formik.values.district]);

  return (
    <DashboardContainer label="Update Profile">
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}>
          <CircularProgress size={180} />
        </Box>
      )}
      {!loading && (
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {/* Profile Picture  */}

          <div className=" flex justify-center items-center w-full">
            <div className="overflow-hidden group relative w-32 flex justify-center items-center cursor-pointer  h-32 rounded-md bg-slate-200 py-2 ">
              <h1 className=" text-sm font-normal text-zinc-600 ">
                {selectProfilePic ? (
                  <img
                    className="w-full h-full"
                    src={URL.createObjectURL(selectProfilePic)}
                    alt="selectPic"
                  />
                ) : data?.avatar ? (
                  <img
                    className="w-full h-full"
                    src={data?.avatar}
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
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {upazilaState?.length > 0 && (
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
                      labelId="upazila-simple-select-label"
                      id="upazila-simple-select"
                      onChange={formik.handleChange}
                      value={formik.values.upazila}
                      label="Upazila"
                      name="upazila">
                      {upazilaState.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Update Profile
            </Button>
          </Box>
        </Box>
      )}
    </DashboardContainer>
  );
}
