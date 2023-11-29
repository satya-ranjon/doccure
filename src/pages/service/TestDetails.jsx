import { useParams } from "react-router-dom";
import useTestById from "../../hooks/useTestById";
import PageHeader from "../../components/common/PageHeader";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Fragment } from "react";
import useAllTest from "../../hooks/useAllTest";
import TestCard from "./TestCard";
import TestCardSkeleton from "../../components/skeleton/TestCardSkeleton";
import dayjs from "dayjs";
import timeFormat from "../../utils/timeFormat";

const TestDetails = () => {
  const { id } = useParams();
  const { data, loading } = useTestById(id);
  const { data: allTest, loading: allTestLoading } = useAllTest();

  console.log(data?.timeSlot);
  return (
    <div>
      <PageHeader>Test Details</PageHeader>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}>
          <CircularProgress size={180} />
        </Box>
      )}
      <Box mt={5}>
        <Container>
          {!loading && (
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
              <div className="w-full">
                <img src={data?.img} alt="" className=" w-full h-[500px]" />

                <h1 className=" mt-5 text-2xl font-bold">Available Day</h1>
                <div className=" flex justify-start items-start gap-2 flex-wrap">
                  {data?.availableDate.map((item, index) => (
                    <Chip
                      key={index}
                      color="primary"
                      label={item}
                      variant="outlined"
                    />
                  ))}
                </div>
                <h1 className=" mt-5 text-2xl font-bold">Time Slot</h1>
                <h1>
                  {data?.timeSlot && timeFormat(data?.timeSlot[0])} To{" "}
                  {data?.timeSlot && timeFormat(data?.timeSlot[1])}
                </h1>
              </div>
              <div className="w-full">
                <h1 className="text-4xl font-bold">{data?.title}</h1>
                <h4 className=" mt-2 text-lg text-zinc-600">
                  {data?.description}
                </h4>
                <h1 className="text-2xl mt-3 font-bold">Included Tests : </h1>
                <nav aria-label="secondary mailbox folders">
                  <List>
                    {data?.includedTests.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <ListItem disablePadding>
                            <Divider />
                            <ListItemButton>
                              <ListItemText
                                primary={`${index + 1} / ${item}`}
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                        </Fragment>
                      );
                    })}
                  </List>
                </nav>
                <div className=" my-5 flex justify-start items-center gap-2">
                  <Button size="large" variant="outlined" disableTouchRipple>
                    <span className=" font-bold ">Price : {data?.price} ৳</span>
                  </Button>
                  <Button size="large" variant="contained">
                    <span className=" font-bold ">Book This Test</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Divider />
          <div className="flex justify-center items-center mt-6">
            <span className=" border-2 border-b-0 px-3 py-1 text-lg text-zinc-600">
              Note
            </span>
          </div>
          <div className=" flex flex-col gap-5 border-2 rounded-md p-3 py-5 text-xs text-zinc-500">
            <span>
              FBS: প্রিপারেশনঃ রাতে স্বাভাবিক খাবার গ্রহনের পর ন্যূনতম ৮ ঘণ্টা
              এবং সর্বোচ্চ ১২ ঘণ্টা পানি ব্যতিত অন্য কোন খাবার বা পানিও গ্রহন
              করা যাবে না। বিশেষ নির্দেশনাঃ চিকিৎসক অনেক সময় দিনের অন্য সময়ও ৮
              থেকে ১২ ঘণ্টা খাবার গ্রহন না করা অবস্থায় FBS এর Sample নেওয়ার
              পরামর্শ দিয়ে থাকেন। যেমনঃ রোজা অবস্থায়।
            </span>
            <Divider />
            <span>
              2hrs ABF: প্রিপারেশনঃ সকালে নাস্তা করার ২ ঘণ্টা পর sample দিতে
              হবে।
            </span>
            <Divider />
            <span>
              S. Lipid Profile (Fasting): প্রিপারেশনঃ রাতের স্বাভাবিক খাবার
              গ্রহনের পর ন্যূনতম ৮ ঘন্টা এবং সর্বোচ্চ ১২ ঘন্টা পানি ব্যতিত অন্য
              কোন খাবার বা পানীয় গ্রহন করা যাবে না।
            </span>
            <Divider />
            <span>
              USG Whole Abdomen MCC with PVR: প্রিপারেশনঃ আগের দিন রাতে মাছ,
              মাংস খাওয়া যাবে না, সাধারন সবজি খাবার খেতে হবে, টেস্ট করার সময়
              প্রসাবের চাপ লাগবে এবং পেট ৫-৬ ঘণ্টা খালি থাকতে হবে।
            </span>
          </div>
          <div className=" bg-zinc-50 text-xs text-zinc-500 my-6 flex flex-col justify-center items-center gap-2 p-4 border-2">
            <span>Terms & Conditions</span>
            <span>
              PDCL cannot be responsible in terms of any unavoidable
              circumstances.
            </span>
            <span>
              Any tests in the package cannot be changed and refunded.
            </span>
            <span>Report delivery time may vary based on test type.c</span>
            <span>
              If necessary, the patient may provide repeat specimen/repeat test
              can be done. If necessary, the patient may provide repeat
              specimen/repeat test can be done.
            </span>
            <span>
              These PDCL health screening packages do not provide any
              medical/fitness certificate.
            </span>
            <span>
              Home service charge is not included in the package price &
              availability depends on test type.
            </span>
            <span>
              PDCL serves the right to amend prices, terms, and conditions
              without prior notice.
            </span>
          </div>

          <Box mt={5} mb={5}>
            <h1 className=" text-3xl font-bold  my-2">Popular Packages:</h1>

            {allTestLoading && (
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                <TestCardSkeleton />
                <TestCardSkeleton />
                <TestCardSkeleton />
              </div>
            )}

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {!allTestLoading &&
                allTest
                  .slice(0, 3)
                  .map((item) => <TestCard key={item._id} item={item} />)}
            </div>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default TestDetails;
