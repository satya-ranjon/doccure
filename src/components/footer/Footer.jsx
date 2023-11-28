import { Container } from "@mui/material";
import { images } from "../../constant";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <div className=" bg-[#f8fafc] pt-28">
      <Container>
        <div className=" grid  grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 ">
          <div className="">
            <img src={images.footerLogo} alt="" />
            <span>
              Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna ad minim
              veniam aliqua.
            </span>
          </div>
          <div className="">
            <h1 className=" text-xl font-bold">Specialities</h1>
            <div className=" flex flex-col gap-3 mt-3">
              <h3 className=" text-sm">Neurology </h3>
              <h3 className=" text-sm"> Cardiologist </h3>
              <h3 className=" text-sm">Dentist</h3>
            </div>
          </div>
          <div className="">
            <h1 className=" text-xl font-bold">Contact Us</h1>
            <div className=" flex flex-col gap-3 mt-3">
              <h3 className=" text-sm space-x-2">
                <FmdGoodIcon /> <span>245/2 New Circular Road, Dhaka</span>
              </h3>
              <h3 className=" text-sm space-x-2">
                <AddIcCallIcon /> <span>01700000000</span>
              </h3>
              <h3 className=" text-sm space-x-2">
                <EmailIcon />
                <span>doccure@example.com</span>
              </h3>
            </div>
          </div>
          <div className="">
            <h1 className=" text-xl font-bold">Join Our Newsletter</h1>
            <div className=" flex flex-col gap-3 mt-3">
              <div className="flex items-stretch ">
                <input
                  className="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500"
                  type="email"
                  placeholder="Your Email"
                />
                <button className="w-32 rounded-l-none hover:bg-indigo-600 bg-indigo-700 rounded text-base font-medium leading-none text-white p-5 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
                  subscribe
                </button>
              </div>
              <div className=" flex justify-start items-center gap-2">
                <FacebookIcon />
                <TwitterIcon />
                <YouTubeIcon />
                <InstagramIcon />
                <LinkedInIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 text-zinc-500 border-t-2 mt-8 flex justify-between items-center">
          <span className=" text-sm">
            Copyright © 2023 Doccure. All Rights Reserved
          </span>
          <span className=" text-sm">Privacy PolicyTerms and Conditions</span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
