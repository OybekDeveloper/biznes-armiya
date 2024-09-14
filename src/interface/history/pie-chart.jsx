import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApiService } from "../../components/api.server";

const ApexChart = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const [chartData, setChartData] = useState({
    series: [0, 0, 0],
    options: {
      chart: {
        type: "pie",
        height: "auto",
      },
      labels: [
        "Jami VAB: 0",
        "Odamlardagi VAB: 0",
        "Qarz ko'rinishidagi VAB: 0",
      ],
      colors: ["#10b981", "#06b6d4", "#ef4444"], // Custom colors
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "90%",
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await ApiService.getData("/users", register.access);
        console.log(res, "users");
        const qozon = res.find((c) => +c.role == 15);
        console.log(qozon, "QOZON");

        // Calculate Jami VAB, Odamlardagi VAB, and Qarz ko'rinishidagi VAB
        let totalVAB = 0;
        let debtVAB = 0;

        res.forEach((user) => {
          totalVAB += user.vab; // Jami VAB
          if (user.vab < 0) {
            debtVAB += user.vab; // Qarz ko'rinishidagi VAB
          }
        });
        if (qozon && res) {
          const peopleVAB = totalVAB - qozon.vab; // Odamlardagi VAB

          // Update the chart data and labels based on the calculated values
          setChartData((prevData) => ({
            series: [totalVAB, peopleVAB, Math.abs(debtVAB)],
            options: {
              ...prevData.options,
              labels: [
                `Jami VAB: ${totalVAB}`,
                `Odamlardagi VAB: ${peopleVAB}`,
                `Qarz ko'rinishidagi VAB: ${Math.abs(debtVAB)}`,
              ],
            },
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [register.access]);

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width="100%"
      />
    </div>
  );
};

export default ApexChart;
