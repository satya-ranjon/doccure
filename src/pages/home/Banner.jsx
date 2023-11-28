import { Button, Container } from "@mui/material";
import banner from "../../assets/banner.png";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div>
      <Container>
        <div className=" flex flex-col-reverse lg:flex-row gap-8 justify-between items-center py-28">
          <div className="w-full flex flex-col gap-4">
            <h1 className=" text-4xl font-bold">
              Search Doctor, Make an Appointment
            </h1>
            <h4 className=" text-zinc-500 text-md">
              We can guide you through issues like Cardiac arrest, Heart
              Failure, Peripheral Artery Disease, Arrhythmia, Atrial
              Fibrillation, Cholesterol and High BP.
            </h4>
            <h4 className=" text-2xl  font-bold ">
              Coupon:
              <span className="ml-3 bg-sky-600 py-1 px-3 rounded-lg text-white font-bold">
                5DCA0
              </span>
            </h4>
            <h4 className=" text-3xl font-bold">UP TO 25% OFF</h4>
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
            <img src={banner} alt="" className=" h-[600px] w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
