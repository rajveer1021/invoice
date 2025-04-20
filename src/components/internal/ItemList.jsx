import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantityField from "../shared/fields/QuantityField";
import AmountField from "../shared/fields/AmountField";
import DescriptionField from "../shared/fields/DescriptionField";
import RateField from "../shared/fields/RateField";
import UnitField from "../shared/fields/UnitField";

const ItemList = ({
  itemFields,
  values,
  handleDeleteItem,
  selectedCurrency,
  setFieldValue,
  selectedOption,
}) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const HeaderCell = ({ label }) => (
    <Typography style={{ fontWeight: 500, fontSize: "0.75rem" }}>
      {label}
    </Typography>
  );

  const handleQuantityChange = (e, index) => {
    const newQuantity = e.target.value;
    setFieldValue((prevState) => ({
      ...prevState,
      item: prevState?.item?.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity, key: i } : item
      ),
    }));
  };

  const handleRateChange = (e, index) => {
    const newRate = e.target.value;
    setFieldValue((prevState) => ({
      ...prevState,
      item: prevState?.item?.map((item, i) =>
        i === index ? { ...item, rate: newRate, key: i } : item
      ),
    }));
  };

  const handleUnitChange = (e, index) => {
    const newUnit = e.target.value;
    setFieldValue((prevState) => ({
      ...prevState,
      item: prevState?.item?.map((item, i) =>
        i === index ? { ...item, unit: newUnit, key: i } : item
      ),
    }));
  };

  return (
    <>
      <Box className="mt-18">
        {!mobile ? (
          <Box className="descriptionContainer">
            <Grid container sx={{ paddingTop: "0rem", paddingLeft: "1rem" }}>
              <Grid item xs={12} sm={5} paddingTop={0}>
                <HeaderCell label="Description" />
              </Grid>
              <Grid item xs={4} sm={2} paddingTop={0}>
                <HeaderCell label="Quantity" />
              </Grid>
              <Grid item xs={3} sm={2} paddingTop={0}>
                <HeaderCell label="Rate" />
              </Grid>
              <Grid item xs={3} sm={2.5} paddingTop={0}>
                <HeaderCell label="Amount" />
              </Grid>
              <Grid item xs={3} sm={0.5} paddingTop={0}>
                <HeaderCell label="" />
              </Grid>
              <Grid
                item
                xs={2}
                sm={0.7}
                className="center"
                paddingTop={0}
              ></Grid>
            </Grid>
          </Box>
        ) : (
          <Typography className="invoiceNumber">Items</Typography>
        )}

        {itemFields?.map((item, index) => {
          
          return (
            <Box
              className="mt-18"
              key={index}
              sx={{
                paddingInline: {
                  xs: 0,
                  md: 2,
                },
              }}
            >
              <Grid container spacing={{ xs: 1.5, md: 2 }}>
                <Grid item sm={5} xs={12}>
                  <DescriptionField
                    minRows={3}
                    name={`item[${index}].title`}
                    value={values.item[index]?.title || ""}
                    label="Description"
                    state={"100%"}
                    line_type_name={`item[${index}].line_type`}
                    selectedOption={item?.line_type}
                    onChange={(e) => {
                      setFieldValue(`item[${index}].title`, e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={2}>
                  {
                    item.line_type!== "expense" && (
                      <QuantityField
                        name={`item[${index}].quantity`}
                        value={values?.item[index]?.quantity}
                        label="Quantity"
                        onChange={(e) => handleQuantityChange(e, index)}
                      />
                    )}
                </Grid>
                <Grid item xs={6} sm={2}>
                  {item.rate !== undefined &&
                    item?.rate !== "0.0" &&
                    item.line_type !== "expense" && (
                      <Stack direction="column" alignItems="flex-end">
                        <RateField
                          name={`item[${index}].rate`}
                          value={values?.item[index]?.rate}
                          label="Rate"
                          onChange={(e) => handleRateChange(e, index)}
                        />
                        <UnitField
                          name={`item[${index}].unit`}
                          label="Unit"
                          onChange={(e) => handleUnitChange(e, index)}
                        />
                      </Stack>
                    )}
                </Grid>
                <Grid item xs={10} sm={2.5}>
                  <AmountField
                    name={`item[${index}].amount`}
                    data={values.item[index]?.amount || ""}
                    rate={values.item[index]?.rate}
                    quantity={values.item[index]?.quantity}
                    label="Amount"
                    disabled={item.line_type !== "expense"}
                    currency={selectedCurrency?.code}
                    line_type={item.line_type}
                  />
                </Grid>

                <Grid item xs={2} sm={0.5}>
                  <Box
                    sx={{
                      border: "1.5px solid #CACED5",
                      borderRadius: "5px",
                      width: "2.125rem",
                      height: "2.25rem",
                    }}
                    className="center"
                  >
                    <DeleteIcon
                      sx={{
                        color: "#990000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteItem(index)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ItemList;
