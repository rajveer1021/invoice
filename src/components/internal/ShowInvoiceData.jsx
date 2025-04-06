import React from "react";
import { Box, Typography } from "@mui/material";
import { columnsForInvoice } from "../../constant";
import CustomTable from "../shared/table/index";
import TableSkeleton from "../shared/loader/TableSkeleton";

const ShowInvoiceData = ({
  filterValue,
  isloading,
  onEditClick,
  statusUpdate,
  setLoading,
  handlePreviewClick,
  handleDownload,
  handleDeleteInvoice,
}) => {
  const DynamicTable = ({
    filterValue,
    columns,
    onEditClick,
    statusUpdate,
  }) => (
    <>
      {filterValue && filterValue.length !== 0 && (
        <CustomTable
          columns={columns}
          rows={filterValue}
          onEditClick={onEditClick}
          setLoading={setLoading}
          statusUpdate={statusUpdate}
          handlePreviewClick={handlePreviewClick}
          handleDownload={handleDownload}
          handleDeleteInvoice={handleDeleteInvoice}
        />
      )}
    </>
  );

  const Tabledata = [
    {
      filterValue: filterValue,
      columns: columnsForInvoice,
    },
  ];

  return (
    <>
      <Box className="mt-18">
        {isloading ? (
          <Box className="mt-10 border">
            <TableSkeleton />
          </Box>
        ) : (
          <Box>
            {filterValue?.length !== 0 ? (
              Tabledata?.map((item, index) => (
                <Box key={index}>
                  <DynamicTable
                    filterValue={item.filterValue}
                    columns={item.columns}
                    onEditClick={onEditClick}
                    setLoading={setLoading}
                    statusUpdate={statusUpdate}
                    handlePreviewClick={handlePreviewClick}
                    handleDownload={handleDownload}
                    handleDeleteInvoice={handleDeleteInvoice}
                  />
                </Box>
              ))
            ) : (
              <>
                <Typography className="mt-10 font-12">
                 No Invoice Found
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ShowInvoiceData;
