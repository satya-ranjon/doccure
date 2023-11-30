import { Box, Chip, Container, Pagination, Stack } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import TestCardSkeleton from "../../components/skeleton/TestCardSkeleton";
import TestCard from "./TestCard";
import dayjs from "dayjs";
import DataNotFound from "../../components/common/DataNotFound";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllTest = () => {
  const [filterDate, setFilterDate] = useState(null);
  let selectedDay = filterDate ? new Date(filterDate) : new Date();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalTest, setTotalTest] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const axios = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`/userTests?page=${page}`)
      .then((res) => {
        setTotalTest(res.data.totalTest);
        setData(res.data.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, [page]);

  const tests = data?.filter(
    (item) => item.availableDate === selectedDay?.toISOString()
  );

  let showData = filterDate ? tests : data;

  const handleDelete = () => {
    setFilterDate(null);
  };

  const handlePagination = (event, page) => {
    setPage(page);
  };

  const count = Math.ceil(totalTest / 6);
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

          {!loading && showData?.length === 0 && (
            <DataNotFound> Test Not Found</DataNotFound>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {showData?.map((item) => (
                <TestCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </Box>
        <Stack
          spacing={2}
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            justifyItems: "end",
          }}>
          <Pagination
            size="large"
            count={count}
            defaultPage={1}
            onChange={handlePagination}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default AllTest;
