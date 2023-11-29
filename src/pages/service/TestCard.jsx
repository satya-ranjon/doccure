import { Box, Button, Chip } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TestCard = ({ item }) => {
  return (
    <div className="shadow-2xl shadow-blue-500/20" key={item?._id}>
      <img src={item?.img} alt="" className=" h-48 w-full" />
      <Box py={1} p={2}>
        <h1 className="text-xl font-bold">{item?.title}</h1>
        <div className=" flex justify-between items-center mt-2">
          <div className="flex flex-wrap gap-2">
            <h1 className=" text-lg font-semibold">Date : </h1>
            <Chip
              label={dayjs(item?.availableDate).format("DD-MM-YYYY")}
              color="primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <h1 className=" text-lg font-semibold">Slots : </h1>
            <Chip label={item?.slots} color="primary" />
          </div>
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
