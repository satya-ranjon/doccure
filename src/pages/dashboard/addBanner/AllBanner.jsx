import { IconButton, NativeSelect, Skeleton, Tooltip } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAllBanner from "../../../hooks/useAllBanner";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DashboardContainer from "../../../components/common/DashboardContainer";

const isActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const AllBanner = () => {
  const { data, loading, removeDataById } = useAllBanner();
  const axios = useAxiosSecure();

  const handleStatusChange = (isActive, id, name) => {
    axios
      .patch(`/banner/isActive/${id}`, { isActive })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Banner ${name} isActive ${isActive} `,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteBanner = (id) => {
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
          .delete(`/banner/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Banner has been deleted.",
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
      <DashboardContainer label="ALL BANNERS">
        <div className="max-w-[300px] md:max-w-[620px] lg:max-w-full overflow-scroll lg:overflow-hidden">
          {loading ? (
            <>
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
            </>
          ) : (
            <table className="min-w-[800px] lg:min-w-full w-full  my-0 align-middle text-dark border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                  <th className="pb-3 text-start ">Name</th>
                  <th className="pb-3 text-start ">Title</th>
                  <th className="pb-3 text-start ">Coupon Code</th>
                  <th className="pb-3 text-start ">Coupon Rate</th>
                  <th className="pb-3 text-start ">IsActive</th>
                  <th className="pb-3 text-start ">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="border-b border-dashed last:border-b-0">
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.name}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.title.slice(0, 20)}
                            {item.title.length > 20 && "..."}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.couponCode}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            {item.couponRate} %
                          </span>
                        </td>

                        <td className="p-3 pl-0 text-start">
                          <NativeSelect
                            defaultValue={item.isActive}
                            onChange={(event) =>
                              handleStatusChange(
                                event.target.value,
                                item._id,
                                item.name
                              )
                            }
                            inputProps={{
                              name: "status",
                              id: "uncontrolled-native",
                            }}>
                            {isActive.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </NativeSelect>
                        </td>

                        <td className="p-3 pl-0 text-start">
                          <Tooltip placement="left" title="Edit">
                            <Link to={`/dashboard/edit-banner/${item._id}`}>
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
                              onClick={() => handleDeleteBanner(item._id)}
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
    </>
  );
};

export default AllBanner;
