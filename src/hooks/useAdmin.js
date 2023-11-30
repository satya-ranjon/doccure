import useAxiosSecure from "./useAxiosSecure";
import useAuthentication from "./useAuthentication";
import { useEffect, useState } from "react";

const useAdmin = () => {
  const [isAdminLoading, setAdminLoadin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const { user, loading } = useAuthentication();
  const axios = useAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      setAdminLoadin(true);
      axios
        .get(`/admin/${user?.email}`)
        .then((res) => {
          setIsAdmin(res.data);
          setAdminLoadin(false);
        })
        .catch((err) => {
          setAdminLoadin(false);
        });
    }
  }, [user, loading]);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
