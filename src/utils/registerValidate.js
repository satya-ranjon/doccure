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

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.password = "Password not match";
  } else if (values.password.length < 6) {
    errors.password = "Password is less than 6 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "password doesn't have a capital letter";
  } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(values.password)) {
    errors.password = "password don't have a special character";
  }

  return errors;
};

export default validate;
