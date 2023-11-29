import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useTestById = (id) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const axios = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`/tests/${id}`)
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
  }, [id]);

  return { loading, data, error };
};

export default useTestById;
