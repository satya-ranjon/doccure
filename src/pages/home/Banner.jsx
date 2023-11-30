import { Button, Container } from "@mui/material";
import banner from "../../assets/banner.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const axios = useAxiosPublic();
  useEffect(() => {
    setLoading(true);
    axios
      .get("bannerIsActive")
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch(setLoading(false));
  }, []);
  return (
    <div>
      {loading && (
        <Container>
          <img src={banner} alt="" className=" w-full blur-lg" />
        </Container>
      )}

      {!loading && (
        <Container>
          <div className=" flex flex-col-reverse lg:flex-row gap-8 justify-between items-center py-28">
            <div className="w-full flex flex-col gap-4">
              <h1 className=" text-4xl font-bold">{data?.title}</h1>
              <h4 className=" text-zinc-500 text-md">{data?.description}</h4>
              <h4 className=" text-2xl  font-bold ">
                Coupon:
                <span className="ml-3 bg-sky-600 py-1 px-3 rounded-lg text-white font-bold">
                  {data?.couponCode}
                </span>
              </h4>
              <h4 className=" text-3xl font-bold">
                UP TO {data?.couponRate}% OFF
              </h4>
              <Link to="/all-test">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    fontFamily: "bold",
                  }}>
                  All Test
                </Button>
              </Link>
            </div>
            <div className="w-full">
              <img src={data?.imageUrl} alt="" className=" h-[600px] w-full" />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Banner;
