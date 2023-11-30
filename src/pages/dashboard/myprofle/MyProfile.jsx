import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardContainer from "../../../components/common/DashboardContainer";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axios = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/user-profile")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <DashboardContainer label="Profile">
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "600px",
              alignItems: "center",
            }}>
            <CircularProgress size={180} />
          </Box>
        )}
        {!loading && (
          <div className=" flex flex-col gap-3 items-start justify-start">
            <img
              src={data?.avatar}
              alt="avatar"
              className=" w-48 h-48 rounded-full"
            />
            <Link to="/dashboard/profile-update">
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Link>
            <div className="font-semibold text-lg">Name : {data?.name}</div>
            <div className="font-semibold text-lg">Email : {data?.email}</div>
            <div className="font-semibold text-lg">
              Blood Group : {data?.bloodGroup}
            </div>
            <div className="font-semibold text-lg">
              District : {data?.district}
            </div>
            <div className="font-semibold text-lg">
              Upazila : {data?.upazila}
            </div>
            <div className="font-semibold text-lg">Role : {data?.role}</div>
          </div>
        )}
      </DashboardContainer>
    </div>
  );
};

export default MyProfile;
