import { Button, Chip, Skeleton } from "@mui/material";
import DashboardContainer from "../../../components/common/DashboardContainer";
import useAppointments from "../../../hooks/useAppointments";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import DataNotFound from "../../../components/common/DataNotFound";

const MyUpcomingAppointments = () => {
  const { data, loading, removeDataById } = useAppointments();
  const axios = useAxiosSecure();

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
          .delete(`/delete-appointment/${id}`)
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
  return (
    <>
      <DashboardContainer label="Upcoming Appointments">
        <div className=" max-w-[300px] md:max-w-[650px] lg:max-w-full overflow-scroll overflow-y-hidden lg:overflow-hidden">
          {loading && (
            <>
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
            </>
          )}
          {!loading && (
            <table className=" min-w-[800px] lg:min-w-full my-0 align-middle text-dark border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                  <th className="pb-3 text-start ">Name</th>
                  <th className="pb-3 text-start ">Date/Time</th>
                  <th className="pb-3 text-start ">Payment</th>
                  <th className="pb-3 text-start ">Status</th>
                  <th className="pb-3 text-start ">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
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
                      <td className="p-3 pl-0">
                        {dayjs(item?.date).format("LLL")}
                      </td>
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

          {!loading && data.length === 0 && (
            <DataNotFound>
              <span className=" text-xl my-3">
                You have no Upcoming Appointments
              </span>
            </DataNotFound>
          )}
        </div>
      </DashboardContainer>
    </>
  );
};

export default MyUpcomingAppointments;
