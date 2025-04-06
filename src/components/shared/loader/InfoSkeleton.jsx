import { Box, Skeleton } from "@mui/material";
import React from "react";

const InfoSkeleton = () => {
  return (
    <>
      <Box
        style={{
          width: "100%",
        }}
        className="mt-10 center"
      >
        <Skeleton
          variant="rectangular"
          width={"95%"}
          height={48}
          animation="wave"
        />
      </Box>
    </>
  );
};

export default InfoSkeleton;
