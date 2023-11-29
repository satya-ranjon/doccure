import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TestCard = ({ item }) => {
  return (
    <div className="shadow-2xl shadow-blue-500/20" key={item?._id}>
      <img src={item?.img} alt="" className=" h-48 w-full" />
      <Box py={1} p={2}>
        <h1 className="text-xl font-bold">{item?.title}</h1>
        <div className="flex flex-wrap gap-2">
          <h1 className=" text-sm font-semibold">Available day:</h1>
          <Box>
            {item?.availableDate.map((item) => (
              <span
                className="py-1 px-1 text-xs bg-sky-600 text-white"
                key={item}>
                {item.slice(0, 3)}
              </span>
            ))}
          </Box>
        </div>
        <div className="flex mt-4 justify-between items-start gap-2">
          <Button size="small" variant="outlined" disableTouchRipple>
            <span className=" font-bold ">Price : {item?.price} ৳</span>
          </Button>
          <Link to={`/tests/${item?._id}`}>
            <Button size="small" variant="contained">
              <span className=" font-bold ">Details</span>
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default TestCard;
