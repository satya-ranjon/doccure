import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUser] = useState(0);
  const [error, setError] = useState(false);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const axios = useAxiosSecure();

  const fetchMore = (page) => {
    console.log("pagep", page);
    setFetchMoreLoading(true);
    axios
      .get(`/user?page=${page}&pageSize=7`)
      .then((res) => {
        setData([...data, ...res.data.data]);
        setFetchMoreLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("/user?page=1&pageSize=7")
      .then((res) => {
        setData(res.data.data);
        setTotalUser(res.data.totalUsers);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return { loading, data, error, totalUsers, fetchMoreLoading, fetchMore };
};

export default useAllUser;
