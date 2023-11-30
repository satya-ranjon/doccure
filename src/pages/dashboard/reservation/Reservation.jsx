import { Chip, Skeleton, Button, Modal, Box, TextField } from "@mui/material";
import DashboardContainer from "../../../components/common/DashboardContainer";
import { Link } from "react-router-dom";
import useAllReservation from "../../../hooks/useAllReservation";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import DataNotFound from "../../../components/common/DataNotFound";

const validate = (values) => {
  const errors = {};
  if (!values.searchQuery) {
    errors.searchQuery = "Search";
  }
  return errors;
};

const Reservation = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const { data, loading, removeDataById, updateDataLoading, updateDataById } =
    useAllReservation();
  const axios = useAxiosSecure();

  const handleClose = () => {
    if (updateDataLoading) {
      return;
    }
    setOpen(false);
    setUpdateData({});
  };

  useEffect(() => {
    setOpen(false);
  }, [data]);

  const addResult = (id, data) => {
    if (id) {
      setOpen(true);
    }

    if (data?.email) {
      setUpdateData({
        id: id,
        email: data.email,
        price: data.price,
        transactionId: data.transactionId,
        date: data.date,
        test: data.test,
        result: "",
        status: "delivered",
      });
    }

    if (updateData?.result) {
      updateDataById(updateData);
    }
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/delete-appointment/admin/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Cancel!",
              text: "Your booking has been canceled.",
              icon: "success",
            });
            removeDataById(id);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      searchQuery: "",
    },
    validate,
    onSubmit: ({ searchQuery }) => {
      setSearchLoading(true);
      setSearch(true);
      axios
        .get(`/appointment/search?searchQuery=${searchQuery}`)
        .then((res) => {
          setSearchLoading(false);
          setSearchResult(res.data);
        })
        .catch((err) => {
          setSearchLoading(false);
        });
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setSearch(false);
  };
  useEffect(() => {
    if (formik.values.searchQuery?.length === 0 && search) {
      setSearch(false);
    }
  }, [formik.values.searchQuery]);

  const reservations =
    formik.values.searchQuery && search ? searchResult : data;
  return (
    <>
      <DashboardContainer label="All Reservations">
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 2,
          }}>
          <TextField
            size="small"
            error={formik.errors.searchQuery ? true : false}
            onChange={formik.handleChange}
            value={formik.values.searchQuery}
            label="Search by email"
            id="outlined-basic"
            variant="outlined"
            name="searchQuery"
          />
          {formik.values.searchQuery && (
            <Button onClick={handleReset} color="error" variant="contained">
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" endIcon={<SearchIcon />}>
            Search
          </Button>
        </Box>
        <div className=" max-w-[300px] md:max-w-[650px] lg:max-w-full overflow-scroll overflow-y-hidden lg:overflow-hidden">
          {(loading || searchLoading) && (
            <>
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
            </>
          )}
          {!(loading || searchLoading) && reservations.length > 0 && (
            <table className=" min-w-[800px] lg:min-w-full my-0 align-middle text-dark border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                  <th className="pb-3 text-start ">Name</th>
                  <th className="pb-3 text-start ">Email</th>
                  <th className="pb-3 text-start ">Payment</th>
                  <th className="pb-3 text-start ">Status</th>
                  <th className="pb-3 text-start ">Result</th>
                  <th className="pb-3 text-start ">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservations?.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="border-b border-dashed last:border-b-0">
                      <td className="p-3 pl-0">
                        <Link to={`/tests/${item.test.id}`}>
                          <span className=" text-sky-500 underline">
                            {item?.test?.name}
                          </span>
                        </Link>
                      </td>
                      <td className="p-3 pl-0">{item?.email}</td>
                      <td className="p-3 pl-0">${item?.price}</td>
                      <td className="p-3 pl-0">
                        <Chip
                          label={item?.status}
                          color={
                            item?.status === "pending" ? "error" : "success"
                          }
                          variant="outlined"
                        />
                      </td>
                      <td className="p-3 pl-0">
                        {item?.result ? (
                          <Chip
                            label="Complete"
                            color="success"
                            variant="outlined"
                          />
                        ) : (
                          <Button
                            onClick={() => addResult(item._id, item)}
                            variant="contained"
                            color="primary"
                            size="small">
                            ADD
                          </Button>
                        )}
                      </td>
                      <td className="p-3 pl-0">
                        <Button
                          onClick={() => handleCancel(item._id)}
                          variant="contained"
                          color="error"
                          size="small">
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!(loading || searchLoading) && reservations.length === 0 && (
            <DataNotFound>
              <span className=" text-xl my-3">Reservations not found</span>
            </DataNotFound>
          )}
        </div>
      </DashboardContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}>
          {open && (
            <div className="flex justify-between items-start  gap-2">
              <TextField
                fullWidth
                label="Result Download Link"
                id="fullWidth"
                value={updateData?.result}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, result: e.target.value }))
                }
              />
              <LoadingButton
                loading={updateDataLoading}
                onClick={addResult}
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 5, py: 1.8 }}>
                Save
              </LoadingButton>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Reservation;
