import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function BalanceChart() {
  const data = {
    labels: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#3773f5",
        borderColor: "#3774f5",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#3773f5",
        pointBackgroundColor: "#3773f5",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3773f5",
        pointHoverBorderColor: "#3774f5",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 69, 80, 81, 56, 72, 65, 61, 100, 92, 70, 55],
      },
    ],
  };

  const options = {
    pligins: {
      legend: { display: false },
    },
  };
  return (
    <div>
      <Line data={data} options={options} width={400} height={100} />
    </div>
  );
}

export default BalanceChart;
