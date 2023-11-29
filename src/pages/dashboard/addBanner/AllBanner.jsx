import { IconButton, NativeSelect, Skeleton, Tooltip } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAllBanner from "../../../hooks/useAllBanner";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
    axios
      .delete(`/banner/${id}`)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Delete Banner Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        removeDataById(id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" max-w-[380px] md:max-w-full">
        <div className="flex flex-wrap">
          <div className="w-full ">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div className="px-2 md:px-5 lg:px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className=" text-2xl font-bold">ALL BANNERS</span>
                  </h3>
                </div>
                {/* <!-- end card header --> */}
                {/* <!-- card body  --> */}
                <div className="flex-auto block py-8 pt-6 px-2 md:px-5 lg:px-9">
                  <div className="overflow-x-auto">
                    {loading ? (
                      <>
                        <Skeleton
                          sx={{ mt: 2 }}
                          variant="rectangular"
                          height={35}
                        />
                        <Skeleton
                          sx={{ mt: 2 }}
                          variant="rectangular"
                          height={35}
                        />
                        <Skeleton
                          sx={{ mt: 2 }}
                          variant="rectangular"
                          height={35}
                        />
                        <Skeleton
                          sx={{ mt: 2 }}
                          variant="rectangular"
                          height={35}
                        />
                        <Skeleton
                          sx={{ mt: 2 }}
                          variant="rectangular"
                          height={35}
                        />
                      </>
                    ) : (
                      <table className="w-full  my-0 align-middle text-dark border-neutral-200">
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
                                      {item.title}
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
                                        <option
                                          key={item.value}
                                          value={item.value}>
                                          {item.label}
                                        </option>
                                      ))}
                                    </NativeSelect>
                                  </td>

                                  <td className="p-3 pl-0 text-start">
                                    <Tooltip placement="left" title="Edit">
                                      <Link
                                        to={`/dashboard/edit-banner/${item._id}`}>
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
                                        onClick={() =>
                                          handleDeleteBanner(item._id)
                                        }
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBanner;
