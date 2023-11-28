import { Box, Button, Container } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import useAllTest from "../../hooks/useAllTest";
import CloseIcon from "@mui/icons-material/Close";
import TestCardSkeleton from "../../components/skeleton/TestCardSkeleton";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const AllTest = () => {
  const [filterDate, setFilterDate] = useState();
  let selectedDay = new Date(filterDate).getDay();

  const { data, loading } = useAllTest();

  const tests = data.filter((item) => {
    const dates = item.availableDate;
    return dates.includes(selectedDay);
  });

  const removeFilter = () => {
    setFilterDate();
  };

  let showData = filterDate ? tests : data;

  return (
    <div className=" pb-28">
      <PageHeader>All / Tests</PageHeader>
      <Container sx={{ mt: 5 }}>
        <div className="text-sm mb-2 space-x-2">
          <SortIcon /> <span>Filter</span>{" "}
          {filterDate && (
            <span className=" px-2 py-1 text-xs bg-sky-600 text-white">
              {days[selectedDay]}{" "}
              <CloseIcon onClick={removeFilter} className=" cursor-pointer" />
            </span>
          )}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Filter By Date"
              selectedSections="day"
              onChange={(value) => setFilterDate(value)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Box mt={5}>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TestCardSkeleton />
              <TestCardSkeleton />
              <TestCardSkeleton />
            </div>
          )}

          {!loading && showData.length === 0 && (
            <>
              <div className="text-center text-xl md:text-5xl font-bold">
                Test Not Found
              </div>
            </>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {showData.map((item) => (
                <div className="shadow-2xl shadow-blue-500/20" key={item._id}>
                  <img src={item.img} alt="" className=" h-48 w-full" />
                  <Box py={1} p={2}>
                    <h1 className="text-xl font-bold">{item.title}</h1>
                    <div className="flex flex-wrap gap-2">
                      <h1 className=" text-sm font-semibold">Available day:</h1>
                      <Box>
                        {item.availableDate.map((item) => (
                          <span
                            className="py-1 px-1 text-xs bg-sky-600 text-white"
                            key={item}>
                            {days[item].slice(0, 3)}
                          </span>
                        ))}
                      </Box>
                    </div>
                    <Button sx={{ mt: 1 }} variant="contained">
                      Detail
                    </Button>
                  </Box>
                </div>
              ))}
            </div>
          )}
        </Box>
      </Container>

      <div className=" h-screen"></div>
    </div>
  );
};

export default AllTest;
