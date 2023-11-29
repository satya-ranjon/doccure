import { IconButton, Skeleton, Tooltip } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAllTest from "../../../hooks/useAllTest";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const AllTests = () => {
  const axios = useAxiosSecure();

  const { data: AllTest, removeDataById, loading } = useAllTest();

  const handleDeleteTest = (id) => {
    axios
      .delete(`/tests/${id}`)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Delete Test Successfully`,
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
                    <span className="mr-3 font-semibold text-dark">
                      ALL Tests
                    </span>
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
                            <th className="pb-3 text-start ">Title</th>
                            <th className="pb-3 text-start ">Price</th>
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
                                      {item.price}
                                    </span>
                                  </td>

                                  <td className="p-3 pl-0 text-start">
                                    <Tooltip placement="left" title="Edit">
                                      <Link
                                        to={`/dashboard/edit-test/${item._id}`}>
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
                                          handleDeleteTest(item._id)
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

export default AllTests;
