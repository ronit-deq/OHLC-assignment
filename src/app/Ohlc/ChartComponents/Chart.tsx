import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  series: number[];
}

const OPTIONS: ApexCharts.ApexOptions | undefined = {
  grid: {
    show: true,
    borderColor: "#90A4AE",
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  plotOptions: {
    candlestick: {
      wick: {
        useFillColor: true,
      },
      colors: {
        upward: "#46a781",
        downward: "#e44b44",
      },
    },
  },
  chart: {
    foreColor: "#cccccc",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tickAmount: 10,
    tooltip: {
      enabled: true,
    },
    opposite: true,
  },
};

const Chart = ({ series }: ChartProps) => {
  return (
    <div id="chart">
      {series.length > 0 ? (
        <ReactApexChart
          options={OPTIONS}
          series={[{ data: series }]}
          type="candlestick"
          height={"100%"}
          width={"100%"}
        />
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
};

export default Chart;
