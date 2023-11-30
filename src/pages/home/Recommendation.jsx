import { Avatar, Box, Button, Container } from "@mui/material";
import SectionTitle from "../../components/common/SectionTitle";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Recommendation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axios = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    axios
      .get("recommendation")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className=" py-28">
      <Container>
        <SectionTitle name="Recommendation" />
        <Box sx={{ mt: 10 }}>
          {!loading && data.length > 0 ? (
            <Slider {...settings}>
              {data.map((item) => (
                <div key={item._id} className=" p-3">
                  <img src={item.img} alt="" />
                  <div className=" py-2 px-2">
                    <h1 className=" text-xl font-bold">{item.title}</h1>
                    <div className=" flex justify-between items-center ">
                      <div className="py-2 flex justify-start items-center gap-2">
                        <Avatar alt="Remy Sharp" src={item.author.avatar} />
                        <div className="flex justify-start items-start flex-col">
                          <span className=" text-sm">Specialist</span>
                          <span>{item.author.name}</span>
                        </div>
                      </div>
                      <Button variant="contained">Contact</Button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <h1>Not Found</h1>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Recommendation;
