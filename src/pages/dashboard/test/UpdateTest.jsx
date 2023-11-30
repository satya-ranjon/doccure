import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useTestById from "../../../hooks/useTestById";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DashboardContainer from "../../../components/common/DashboardContainer";

const initialState = {
  img: "",
  price: "",
  slots: "",
  title: "",
  description: "",
};

const UpdateTest = () => {
  const [state, setState] = useState(initialState);
  const [availableDate, setAvailableDate] = useState();
  const [includedTests, setIncludedTest] = useState([]);
  const [error, setError] = useState("");
  const axios = useAxiosSecure();

  const { id } = useParams();
  const { data, loading } = useTestById(id);

  useEffect(() => {
    if (!loading && data?._id) {
      setState((prev) => ({
        ...prev,
        img: data?.img,
        price: data?.price,
        title: data?.title,
        description: data?.description,
        slots: data?.slots,
      }));
      setAvailableDate(dayjs(data?.availableDate));
      setIncludedTest(data?.includedTests);
    }
  }, [data, loading]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      ...state,
      availableDate,
      includedTests,
    };
    if (!data.title) {
      setError("Test title is required!");
      return;
    }
    if (!data.img) {
      setError("Test image URL is required!");
      return;
    }
    if (!data.price) {
      setError("Test price is required!");
      return;
    }
    if (!data.includedTests.length > 0) {
      setError("Included Tests is required!");
      return;
    }
    if (!data.availableDate) {
      setError("Available Date is required!");
      return;
    }
    if (!data.description) {
      setError("Test Description is required!");
      return;
    }
    setError("");

    if (!error?.length > 0) {
      axios
        .put(`/tests/${id}`, updateData)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Test Update successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [error]);
  return (
    <>
      <DashboardContainer label="UPDATE TEST">
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
        {!loading && availableDate && (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 mt-5">
            <TextField
              value={state.title}
              onChange={handleChange}
              name="title"
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
            <TextField
              value={state.img}
              onChange={handleChange}
              name="img"
              id="outlined-basic"
              label="Image Url"
              variant="outlined"
            />
            <TextField
              value={state.slots}
              onChange={handleChange}
              name="slots"
              id="outlined-basic"
              label="Slots"
              type="number"
              variant="outlined"
            />

            <TextField
              value={state.price}
              onChange={handleChange}
              name="price"
              id="outlined-basic"
              label="Price"
              type="number"
              variant="outlined"
            />

            {/* =========== Included Tests ============ */}
            <Autocomplete
              multiple
              value={includedTests}
              id="tags-outlined"
              options={testSuggestion.map((option) => option)}
              onChange={(event, newValue) => setIncludedTest(newValue)}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Included Tests"
                  placeholder="Tests"
                />
              )}
            />
            {/* =========== Available Date 1 ============ */}
            <LocalizationProvider
              sx={{ width: "100%" }}
              dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ width: "100%" }} components={["DatePicker"]}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Available Date"
                  defaultValue={availableDate}
                  onChange={(value) => setAvailableDate(value)}
                />
              </DemoContainer>
            </LocalizationProvider>

            <textarea
              value={state.description}
              onChange={handleChange}
              id="description"
              rows="6"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300  focus:ring-offset-blue-700 focus:outline-blue-700"
              placeholder="Description..."
            />
            <Button type="submit" size="large" variant="contained">
              Update Test
            </Button>
          </form>
        )}
      </DashboardContainer>
    </>
  );
};

export default UpdateTest;

const testSuggestion = [
  "CBC",
  "FBS",
  "2hrs 75g Glucose",
  "S. GPT",
  "S. Creatinine",
  "S. Lipid Profile (Fasting)",
  "Urine R/M/E",
  "X-Ray Plain Abdomen KUB Region",
  "USG Whole Abdomen MCC with PVR",
  "ECHO-Color Doppler",
  "ECG",
  "X-Ray Chest P/A View (100% Digital)",
  "Stool R/M/E & OBT",
  "Vitamin-D",
  "Anti-HCV",
  "HBsAg",
  "FT4",
  "PSA",
  "S.TSH",
  "CRP",
  "Included Tests",
  "2hrs ABF",
  "HbA1c",
  "S. Electrolytes",
  "Urine Micro Albumin",
];
