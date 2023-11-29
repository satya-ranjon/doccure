import { Box, Chip, Container } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import useAllTest from "../../hooks/useAllTest";
import TestCardSkeleton from "../../components/skeleton/TestCardSkeleton";
import TestCard from "./TestCard";
import dayjs from "dayjs";

const AllTest = () => {
  const [filterDate, setFilterDate] = useState(null);
  let selectedDay = filterDate ? new Date(filterDate) : new Date();

  const { data, loading } = useAllTest();

  const tests = data.filter(
    (item) => item.availableDate === selectedDay?.toISOString()
  );

  let showData = filterDate ? tests : data;

  const handleDelete = () => {
    setFilterDate(null);
  };
  return (
    <div className=" pb-28">
      <PageHeader>All / Tests</PageHeader>
      <Container sx={{ mt: 5 }}>
        <div className="text-sm mb-2 space-x-2">
          <SortIcon /> <span>Filter</span>
          {filterDate && (
            <Chip
              label={dayjs(selectedDay).format("DD-MM-YYYY")}
              variant="outlined"
              onDelete={handleDelete}
            />
          )}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Filter By Date"
              selectedSections="day"
              value={filterDate}
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
                <TestCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AllTest;
