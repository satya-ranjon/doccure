import { Box, Button, Modal, NativeSelect, Skeleton } from "@mui/material";
import useAllUser from "../../../hooks/useAllUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmailIcon from "@mui/icons-material/Email";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SchoolIcon from "@mui/icons-material/School";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
const status = [
  { value: "active", label: "Active" },
  { value: "block", label: "Block" },
];
const roles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

const Users = () => {
  const [page, setPage] = useState(1);
  const { data, loading, totalUsers, fetchMore, fetchMoreLoading } =
    useAllUser();
  const axios = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  console.log(selectedUser);

  function handleClick() {
    if (data.length < totalUsers) {
      fetchMore(page + 1);
      setPage(page + 1);
    }
  }

  const handleStatusChange = (status, id, name) => {
    axios
      .put(`/user/status/${id}`, { status })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `User ${name} has been successfully ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };
  const handleRoleChange = (role, id, name) => {
    axios
      .put(`/user/role/${id}`, { role })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: ` ${name} role has been successfully update`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (data) => {
    setSelectedUser(data);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedUser({});
    setOpen(false);
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
                      Total Users {totalUsers}
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
                      </>
                    ) : (
                      <table className="w-full  my-0 align-middle text-dark border-neutral-200">
                        <thead className="align-bottom">
                          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                            <th className="pb-3 text-start ">Avatar</th>
                            <th className="pb-3 text-start ">Name</th>
                            <th className="pb-3 text-start ">Email</th>
                            <th className="pb-3 text-start ">Status</th>
                            <th className="pb-3 text-start ">Role</th>
                            <th className="pb-3 text-start ">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!loading &&
                            data.map((item) => {
                              const activeStatus = item.status;
                              const activeRole = item.role;
                              return (
                                <tr
                                  key={item._id}
                                  className="border-b border-dashed last:border-b-0">
                                  <td className="p-3 pl-0">
                                    <img
                                      src={item.avatar}
                                      className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                      alt=""
                                    />
                                  </td>
                                  <td className="p-3 pl-0 text-start">
                                    <span className="font-semibold text-light-inverse text-md/normal">
                                      {item.name}
                                    </span>
                                  </td>
                                  <td className="p-3 pl-0 text-start">
                                    <span className="font-semibold text-light-inverse text-md/normal">
                                      {item.email}
                                    </span>
                                  </td>
                                  <td className="p-3 pl-0 text-start">
                                    <NativeSelect
                                      defaultValue={activeStatus}
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
                                      {status.map((item) => (
                                        <option
                                          key={item.value}
                                          value={item.value}>
                                          {item.label}
                                        </option>
                                      ))}
                                    </NativeSelect>
                                  </td>
                                  <td className="p-3 pl-0 text-start">
                                    <NativeSelect
                                      defaultValue={activeRole}
                                      onChange={(event) =>
                                        handleRoleChange(
                                          event.target.value,
                                          item._id,
                                          item.name
                                        )
                                      }
                                      inputProps={{
                                        name: "role",
                                        id: "uncontrolled-native",
                                      }}>
                                      {roles.map((item) => (
                                        <option
                                          key={item.value}
                                          value={item.value}>
                                          {item.label}
                                        </option>
                                      ))}
                                    </NativeSelect>
                                  </td>
                                  <td className="p-3 pl-0 text-start">
                                    <Button
                                      onClick={() => handleOpen(item)}
                                      variant="outlined"
                                      size="small">
                                      Details
                                    </Button>
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
              {data.length < totalUsers && !loading && (
                <LoadingButton
                  size="small"
                  sx={{ mt: 5 }}
                  onClick={handleClick}
                  loading={fetchMoreLoading}
                  loadingIndicator="Loading…"
                  variant="outlined">
                  <span>Fetch more data</span>
                </LoadingButton>
              )}
            </div>
          </div>
        </div>
      </div>

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
            <div className="flex justify-between items-start flex-col gap-2">
              <img
                src={selectedUser?.avatar}
                alt=""
                className=" h-32 w-32 rounded-md"
              />
              <h1 className="text-xl text-zinc-600 font-semibold">
                Name: {selectedUser?.name}
              </h1>

              <h1 className=" flex justify-start items-center gap-1 text-lg text-zinc-600 ">
                <EmailIcon />
                <span>Email: {selectedUser?.email}</span>
              </h1>
              <h1 className=" flex justify-start items-center gap-1 text-lg text-zinc-600 ">
                <FmdGoodIcon />
                <span>
                  Location: {selectedUser?.district} / {selectedUser?.upazila}
                </span>
              </h1>
              <h1 className=" flex justify-start items-center gap-1 text-lg text-zinc-600 ">
                <AccessibilityIcon />
                <span>Blood Group: {selectedUser?.bloodGroup}</span>
              </h1>
              <h1 className=" flex justify-start items-center gap-1 text-lg text-zinc-600 ">
                <SchoolIcon />
                <span>
                  Role: <span className=" uppercase">{selectedUser?.role}</span>
                </span>
              </h1>
              <h1 className=" flex justify-start items-center gap-1 text-lg text-zinc-600 ">
                <MilitaryTechIcon />
                <span>
                  Status:{" "}
                  <span className=" uppercase">{selectedUser?.status}</span>
                </span>
              </h1>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Users;
