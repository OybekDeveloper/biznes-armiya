import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartMain = ({ series, categories, filter }) => {
  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: categories,
      tickAmount: filter === "DAILY" ? 10 : filter === "MONTHLY" ? 6 : 5, // Adjust ticks based on filter
      labels: {
        format: filter === "DAILY" ? "dd MMM" : filter === "MONTHLY" ? "MMM yyyy" : "yyyy",
      },
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
        format: filter === "DAILY" ? "dd/MM/yy HH:mm" : filter === "MONTHLY" ? "MMM dd, yyyy" : "yyyy",
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
    </div>
  );
};

export default ChartMain;
