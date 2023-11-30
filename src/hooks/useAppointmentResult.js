import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAppointmentResult = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const axios = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("/user-appointments/result")
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

  return { loading, data, error };
};

export default useAppointmentResult;
