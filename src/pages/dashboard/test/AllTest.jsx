import { IconButton, Skeleton, Tooltip } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAllTest from "../../../hooks/useAllTest";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DashboardContainer from "../../../components/common/DashboardContainer";

const AllTests = () => {
  const axios = useAxiosSecure();

  const { data: AllTest, removeDataById, loading } = useAllTest();

  const handleDeleteTest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/tests/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Test has been deleted.",
              icon: "success",
            });
            removeDataById(id);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <DashboardContainer label="ALL TEST">
        <div className="max-w-[380px] md:max-w-full overflow-scroll md:overflow-hidden">
          {loading ? (
            <>
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
            </>
          ) : (
            <table className=" min-w-[700px] md:min-w-full w-full  my-0 align-middle text-dark border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                  <th className="pb-3 text-start ">Title</th>
                  <th className="pb-3 text-start ">Slots</th>
                  <th className="pb-3 text-start ">Price</th>
                  <th className="pb-3 text-start ">Date</th>
                  <th className="pb-3 text-start ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  AllTest.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="border-b border-dashed last:border-b-0">
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.title.slice(0, 35)}
                            {item.title.length > 35 && "..."}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.slots}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.price}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {dayjs(item?.availableDate).format("DD-MM-YYYY")}
                          </span>
                        </td>

                        <td className="p-3 pl-0 text-start">
                          <Tooltip placement="left" title="Edit">
                            <Link to={`/dashboard/edit-test/${item._id}`}>
                              <IconButton
                                color="info"
                                aria-label="Edit"
                                size="large">
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip placement="right" title="Delete">
                            <IconButton
                              onClick={() => handleDeleteTest(item._id)}
                              color="error"
                              aria-label="delete"
                              size="large">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AllTests;
