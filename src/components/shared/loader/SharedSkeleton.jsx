import { Skeleton } from "@mui/material";
import React from "react";

const SharedSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={50}
        animation="wave"
      />
    </>
  );
};

export default SharedSkeleton;
