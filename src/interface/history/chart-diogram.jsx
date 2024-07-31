import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartMain = ({ series, categories }) => {
  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: categories,
    },
    colors: ["#0B5CB5"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.7,
        stops: [0, 100],
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="bg-white text-black mt-3 rounded-md">
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={500}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartMain;
