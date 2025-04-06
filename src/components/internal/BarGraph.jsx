import React from "react";
import ReactECharts from "echarts-for-react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { months } from "../../constant";

const BarGraph = ({
  selectedMonth,
  selectedYear,
  handleChange,
  handleYearChange,
  value,
  years,
}) => {
  const data = {
    categories: value?.categories,
    series: value?.series,
  };

  const options = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: 40,
      right: 40,
      bottom: 20,
      top: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.categories,
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false,
      },
    },
    series: data?.series?.map((serie) => ({
      name: serie?.name,
      type: "bar",
      data: serie?.data,
      barWidth: 20,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0],
      },
    })),
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #E2E2E2",
        borderRadius: "8px",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        padding="1.5rem"
        spacing={1}
      >
        <Typography sx={{ fontSize: "1.125rem" }}>Invoice</Typography>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <FormControl sx={{ minWidth: "7.5rem", width: "100%" }}>
            <Select
              labelId="month-label"
              id="month-select"
              value={selectedMonth}
              onChange={handleChange}
              style={{ height: "36px" }}
            >
               {months?.map((month, index) => (
        <MenuItem key={index} value={month}>{month}</MenuItem>
      ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              style={{ height: "36px" }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <ReactECharts
        style={{
          width: "100%",
          height: "15rem",
          margin: "0",
        }}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        onChartReady={() => {}}
      />
    </Box>
  );
};

export default BarGraph;
