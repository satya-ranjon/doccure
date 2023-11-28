import { Box, Container, Grid } from "@mui/material";
import SectionTitle from "../../components/common/SectionTitle";
import { images } from "../../constant";

const FeaturedTest = () => {
  return (
    <div className=" py-28 bg-[#f5fdff]">
      <Container>
        <SectionTitle name="Featured Tests" />
        <Box sx={{ flexGrow: 1, mt: 10 }}>
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.Orthopedic} alt="" />
              <h1 className=" font-semibold text-lg ">Orthopedic</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.Laboratry} alt="" />
              <h1 className=" font-semibold text-lg ">Laboratry</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.Neurology} alt="" />
              <h1 className=" font-semibold text-lg ">Neurology</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.Cardiology} alt="" />
              <h1 className=" font-semibold text-lg ">Cardiology</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.MRIScans} alt="" />
              <h1 className=" font-semibold text-lg ">MRI Scans</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.PrimaryCheckup} alt="" />
              <h1 className=" font-semibold text-lg ">Primary Checkup</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.Testing} alt="" />
              <h1 className=" font-semibold text-lg ">Testing</h1>
            </div>
            <div className=" bg-white py-5 flex justify-center items-center flex-col gap-2 rounded-md cursor-pointer">
              <img src={images.Dentist} alt="" />
              <h1 className=" font-semibold text-lg ">Dentist</h1>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default FeaturedTest;
