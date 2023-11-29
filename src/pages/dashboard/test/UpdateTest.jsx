import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
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
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useTestById from "../../../hooks/useTestById";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const initialState = {
  img: "",
  price: "",
  title: "",
  description: "",
};

const UpdateTest = () => {
  const [state, setState] = useState(initialState);
  const [availableDate, setAvailableDate] = useState([]);
  const [timeSlot, setTimeSlot] = useState(() => []);
  const [includedTests, setIncludedTest] = useState([]);
  const [error, setError] = useState("");
  const axios = useAxiosSecure();

  const { id } = useParams();
  const { data, loading } = useTestById(id);

  useEffect(() => {
    if (!loading && data?._id) {
      console.log(data);
      setState((prev) => ({
        ...prev,
        img: data?.img,
        price: data?.price,
        title: data?.title,
        description: data?.description,
      }));
      setAvailableDate(data?.availableDate);
      setTimeSlot(data?.timeSlot);
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
      timeSlot,
      includedTests,
    };
    if (!updateData.title) {
      setError("Test title is required!");
      return;
    }
    if (!updateData.img) {
      setError("Test image URL is required!");
      return;
    }
    if (!updateData.price) {
      setError("Test price is required!");
      return;
    }
    if (!updateData.includedTests.length > 0) {
      setError("Included Tests is required!");
      return;
    }
    if (!updateData.availableDate.length > 0) {
      setError("Available Date is required!");
      return;
    }
    if (!updateData.timeSlot.length > 0) {
      setError("Time Slot is required!");
      return;
    }
    if (!updateData.description) {
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
    <div>
      <h1 className=" text-2xl font-bold mt-8">ADD TEST</h1>
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
        <div className="w-full">
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
              value={state.price}
              onChange={handleChange}
              name="price"
              id="outlined-basic"
              label="Price"
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
            {/* =========== Available Date ============ */}
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Available Date
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={availableDate}
                onChange={(event) => {
                  const value = event.target.value;
                  setAvailableDate(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                input={<OutlinedInput label="Available Date" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}>
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox checked={availableDate.indexOf(day) > -1} />
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* =========== Time Slot ============ */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "SingleInputTimeRangeField",
                  "SingleInputTimeRangeField",
                ]}>
                <SingleInputTimeRangeField
                  label="Time Slot"
                  value={timeSlot}
                  onChange={(newValue) => setTimeSlot(newValue)}
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
        </div>
      )}
    </div>
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
