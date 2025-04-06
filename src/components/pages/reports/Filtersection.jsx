import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import AutoCompleteField from "../../shared/fields/AutoCompleteField";
import DateField from "../../shared/fields/DateField";
import { CustomButton } from "../../shared/CustomButton";

const Filtersection = ({
  clientList,
  isloading,
  errorMessage,
  InvoiceStatus,
  InvoiceNumber,
  setFilterState,
  handleSubmit,
  filterState,
  setErrorMessage,
}) => {
  const { startDate, endDate } = filterState;

  const handleStartDateChange = (newValue) => {
    setFilterState((prevState) => ({ ...prevState, startDate: newValue }));
  };

  const handleEndDateChange = (newValue) => {
    setFilterState((prevState) => ({ ...prevState, endDate: newValue }));
  };

  const handleSelectedClient = (item) => {
    setFilterState((prevState) => ({ ...prevState, selectedClient: item }));
  };

  const handleSelectedInvoiceStatus = (item) => {
    setFilterState((prevState) => ({ ...prevState, invoice_status: item }));
  };
  const handleSelectedInvoiceNumber = (item) => {
    setFilterState((prevState) => ({ ...prevState, invoice_number: item }));
  };

  const [dataValue, setData] = useState(false);
  const isDataCleared = () => {
    return (
      filterState.startDate === null &&
      filterState.endDate === null &&
      filterState.selectedClient === null &&
      filterState.invoice_status === null &&
      filterState.invoice_number === null
    );
  };

  const handleClearFilter = () => {
    setFilterState({
      startDate: null,
      endDate: null,
      selectedClient: null,
      invoice_status: null,
      invoice_number: null,
    });

    setData((prevDataValue) => !prevDataValue);
  };

  useEffect(() => {
    if (isDataCleared()) {
      handleSubmit();
      setErrorMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterState.startDate,
    filterState.endDate,
    filterState.selectedClient,
    filterState.invoice_status,
    filterState.invoice_number,
  ]);

  return (
    <>
      <Box>
        {errorMessage && (
          <>
            <Box className="mt-30 filter_errorMessage">{errorMessage}</Box>
          </>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          flexWrap="wrap"
          spacing={1.5}
          className="mt-30"
          useFlexGap
        >
          <AutoCompleteField
            data={InvoiceNumber && InvoiceNumber}
            label="Invoice Number"
            onChange={handleSelectedInvoiceNumber}
            idField="id"
            dataValue={dataValue}
          />
          <AutoCompleteField
            data={InvoiceStatus}
            label="Invoice Status"
            onChange={handleSelectedInvoiceStatus}
            idField="id"
            dataValue={dataValue}
          />
          <AutoCompleteField
            data={clientList}
            label="Client"
            onChange={handleSelectedClient}
            idField="id"
            dataValue={dataValue}
          />

          <DateField
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <DateField
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </Stack>
       
          <Stack direction="row" className="mt-18" spacing={1.5}>
          <CustomButton
            title={isloading ? "Fetching..." : "Get reports"}
            handleClick={handleSubmit}
            styles="button submitButton"
          />
          <CustomButton
            title="Clear Filter"
            handleClick={handleClearFilter}
            styles="button clearButton"
          />
          </Stack>
      
          
       
      </Box>
    </>
  );
};

export default Filtersection;
