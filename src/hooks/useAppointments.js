import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const axios = useAxiosSecure();

  const removeDataById = (id) => {
    const filterData = data.filter((item) => item._id !== id);
    setData(filterData);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("/user-appointments")
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return { loading, data, error, removeDataById };
};

export default useAppointments;
