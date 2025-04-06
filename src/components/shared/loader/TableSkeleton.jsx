import { Box, Skeleton } from "@mui/material";
import React, { Fragment } from "react";

const TableSkeleton = () => {
  const numberOfSkeleton = [1, 2, 3];
  return (
    <>
      <Box className="TableSkeleton mt-18">
        {numberOfSkeleton?.map((index) => (
          <Fragment key={index}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={50}
              animation="wave"
              className={index !== 0 ? "mb-10" : ""}
            />
          </Fragment>
        ))}
      </Box>
    </>
  );
};

export default TableSkeleton;
