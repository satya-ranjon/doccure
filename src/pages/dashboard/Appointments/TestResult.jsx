import { Button, Chip, Skeleton } from "@mui/material";
import DashboardContainer from "../../../components/common/DashboardContainer";
import { Link } from "react-router-dom";
import DataNotFound from "../../../components/common/DataNotFound";
import useAppointmentResult from "../../../hooks/useAppointmentResult";
import DownloadIcon from "@mui/icons-material/Download";
const TestResult = () => {
  const { data, loading } = useAppointmentResult();

  return (
    <>
      <DashboardContainer label="Upcoming Appointments">
        <div className=" max-w-[300px] md:max-w-[650px] lg:max-w-full overflow-scroll overflow-y-hidden lg:overflow-hidden">
          {loading && (
            <>
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
            </>
          )}
          {!loading && (
            <table className=" min-w-[800px] lg:min-w-full my-0 align-middle text-dark border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                  <th className="pb-3 text-start ">Name</th>
                  <th className="pb-3 text-start ">Result</th>
                  <th className="pb-3 text-start ">Payment</th>
                  <th className="pb-3 text-start ">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="border-b border-dashed last:border-b-0">
                      <td className="p-3 pl-0">
                        <Link to={`/tests/${item.test.id}`}>
                          <span className=" text-sky-500 underline">
                            {item?.test?.name}
                          </span>
                        </Link>
                      </td>
                      <td className="p-3 pl-0">
                        <a
                          href={item?.result}
                          download={`result-${item?.test?.name}.pdf`}>
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<DownloadIcon />}>
                            Result
                          </Button>
                        </a>
                      </td>
                      <td className="p-3 pl-0">${item?.price}</td>
                      <td className="p-3 pl-0">
                        <Chip
                          label={item?.status}
                          color={
                            item?.status === "pending" ? "error" : "success"
                          }
                          variant="outlined"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!loading && data.length === 0 && (
            <DataNotFound>
              <span className=" text-xl my-3">
                You have no Upcoming Appointments
              </span>
            </DataNotFound>
          )}
        </div>
      </DashboardContainer>
    </>
  );
};

export default TestResult;
