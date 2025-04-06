import React from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";

const DonutChart = ({ seriesData }) => {
  const data = {
    legendData: ["Paid", "Unpaid", "Draft", "Due"],
    seriesData: seriesData,
  };

  const getColorByIndex = (index) => {
    const colors = ["#46962b", "#FFC400", "#A3A0FB", "#C5291C"];
    return colors[index % colors.length];
  };

  const options = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 30,
      top: "center",
      itemWidth: 14,
      itemHeight: 14,
      data: data.legendData,
      icon: "circle",
      textStyle: {
        color: "#333",
        fontSize: 14,
      },
      height: "100%",
      itemGap: 15,
    },
    responsive: [
      {
        breakpoint: 900,
        option: {
          legend: {
            orient: "horizontal",
            right: 0,
            top: "bottom",
          },
          series: [
            {
              radius: ["50%", "70%"],
            },
          ],
        },
      },
    ],
    series: [
      {
        name: "Invoice",
        type: "pie",
        radius: ["50%", "90%"],
        center: ["30%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "20",
            fontWeight: "bold",
            position: "right",
          },
        },
        labelLine: {
          show: false,
        },
        data: data?.seriesData?.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: getColorByIndex(index),
          },
        })),
      },
    ],
  };

  return (
    <Box
      sx={{
        border: "1px solid #e2e2e2",
        borderRadius: "0.5rem",
        height: "100%",
        width: "100%",
        minHeight: "9.5625rem",
        padding: "0.5rem",
      }}
    >
      <ReactECharts
        option={options}
        style={{ height: "100%", width: "100%" }}
      />
    </Box>
  );
};

export default DonutChart;
