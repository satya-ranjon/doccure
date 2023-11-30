import { Skeleton } from "@mui/material";

const TestCardSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
      <Skeleton variant="rectangular" height={20} width={200} sx={{ mt: 1 }} />
      <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
    </div>
  );
};

export default TestCardSkeleton;
