import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBannerById from "../../../hooks/useBannerById";
import DashboardContainer from "../../../components/common/DashboardContainer";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.title) {
    errors.title = "Title is Required";
  }
  if (!values.description) {
    errors.description = "Description is Required";
  }
  if (!values.imageUrl) {
    errors.imageUrl = "Image Url is Required";
  }
  if (!values.couponCode) {
    errors.couponCode = "Coupon Code is Required";
  }
  if (!values.couponRate) {
    errors.couponRate = "Coupon Rate is Required";
  }

  return errors;
};

const initialState = {
  name: "",
  title: "",
  description: "",
  imageUrl: "",
  couponCode: "",
  couponRate: "",
  isActive: false,
};

const UpdateBanner = () => {
  const axios = useAxiosSecure();

  const { id } = useParams();
  const { data, loading } = useBannerById(id);

  const formik = useFormik({
    initialValues: initialState,
    validate,
    onSubmit: (value) => {
      const updateData = {
        name: value.name,
        title: value.title,
        description: value.description,
        imageUrl: value.imageUrl,
        couponCode: value.couponCode,
        couponRate: value.couponRate,
        isActive: value.isActive,
      };
      axios.put(`/banner/${id}`, updateData).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Banner Update Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
  });

  useEffect(() => {
    if (!loading && data?._id) {
      formik.setValues(data);
    }
  }, [loading, data]);

  return (
    <>
      <DashboardContainer label="UPDATE BANNER">
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
          <form
            onSubmit={formik.handleSubmit}
            className=" flex flex-col gap-5 mt-5">
            <TextField
              value={formik.values.name}
              error={formik.errors.name ? true : false}
              label={formik.errors.name || "Name"}
              onChange={formik.handleChange}
              name="name"
              id="outlined-basic"
              variant="outlined"
            />
            <TextField
              value={formik.values.title}
              error={formik.errors.title ? true : false}
              label={formik.errors.title || "Title"}
              onChange={formik.handleChange}
              name="title"
              id="outlined-basic"
              variant="outlined"
            />
            <TextField
              value={formik.values.description}
              error={formik.errors.description ? true : false}
              label={formik.errors.description || "Description"}
              onChange={formik.handleChange}
              name="description"
              id="outlined-basic"
              variant="outlined"
            />
            <TextField
              value={formik.values.imageUrl}
              error={formik.errors.imageUrl ? true : false}
              label={formik.errors.imageUrl || "Image Url"}
              onChange={formik.handleChange}
              name="imageUrl"
              id="outlined-basic"
              variant="outlined"
            />
            <TextField
              value={formik.values.couponCode}
              error={formik.errors.couponCode ? true : false}
              label={formik.errors.couponCode || "Coupon Code"}
              onChange={formik.handleChange}
              name="couponCode"
              id="outlined-basic"
              variant="outlined"
            />
            <TextField
              value={formik.values.couponRate}
              error={formik.errors.couponRate ? true : false}
              label={formik.errors.couponRate || "Coupon Rate"}
              onChange={formik.handleChange}
              name="couponRate"
              id="outlined-basic"
              variant="outlined"
              type="number"
            />
            <Button type="submit" size="large" variant="contained">
              Update Banner
            </Button>
          </form>
        )}
      </DashboardContainer>
    </>
  );
};

export default UpdateBanner;
