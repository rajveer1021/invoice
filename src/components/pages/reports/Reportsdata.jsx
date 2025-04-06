import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { columnsForAllInvoicereport } from "../../../constant";
import AllTable from "../../shared/table/allreportTable";

const Reportsdata = ({ invoiceData }) => {
  const DynamicTable = ({ filterValue, columns }) => (
    <>
      {filterValue && filterValue?.length !== 0 && (
        <>
          <Box className="border mt-18" padding="1rem 0.6875rem">
            <AllTable columns={columns} rows={filterValue} />
          </Box>
        </>
      )}
    </>
  );

  const Tabledata = [
    {
      filterValue: invoiceData,
      columns: columnsForAllInvoicereport,
      label: "Invoices",
    },
  ];

  return (
    <>
      <Box className="mt-18">
        {invoiceData?.length !== 0 ? (
          Tabledata?.map((item, index) => (
              <Fragment key={index}>
                <DynamicTable
                  filterValue={item?.filterValue}
                  columns={item?.columns}
                  label={item?.label}
                />
              </Fragment>
          ))
        ) : (
          <Typography textAlign="center">No Invoice Found.</Typography>
        )}
      </Box>
    </>
  );
};

export default Reportsdata;
