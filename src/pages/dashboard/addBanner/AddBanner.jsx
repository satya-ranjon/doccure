import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

const HeroSection = () => {
  const axios = useAxiosSecure();

  const formik = useFormik({
    initialValues: initialState,
    validate,
    onSubmit: (value) => {
      axios.post("banner", value).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Banner Create Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleReset();
      });
    },
  });

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold mt-8">ADD BANNER</h1>

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
          Add Banner
        </Button>
      </form>
    </div>
  );
};

export default HeroSection;
