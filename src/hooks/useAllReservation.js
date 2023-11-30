import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAllReservation = () => {
  const [loading, setLoading] = useState(false);
  const [updateDataLoading, setUpdateDataLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const axios = useAxiosSecure();

  const removeDataById = (id) => {
    const filterData = data.filter((item) => item._id !== id);
    setData(filterData);
  };

  const updateDataById = (newData) => {
    if (newData.id) {
      setUpdateDataLoading(true);
      axios
        .put(`/add-result/${newData.id}`, newData)
        .then((res) => {
          const updateData = data?.filter((item) => {
            if (item._id === newData.id) {
              item.result = newData.result;
              item.status = newData.status;
            }
            return item;
          });
          setData(updateData);
          console.log(res);
          setUpdateDataLoading(false);
        })
        .catch((err) => {
          setUpdateDataLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("/all-appointments")
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

  return {
    loading,
    data,
    error,
    removeDataById,
    updateDataById,
    updateDataLoading,
  };
};

export default useAllReservation;
