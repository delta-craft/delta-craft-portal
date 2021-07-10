import React, { useEffect, useRef } from "react";
import Chart, { ChartData } from "chart.js/auto";
import { IPointSummary } from "../../src/models/types";

interface IProps {
  points: IPointSummary;
  height?: number | string;
  width?: number | string;
  fontSize?: number;
  legendPosition?: "left" | "top" | "right" | "bottom" | "center" | "chartArea";
}

const StatChart: React.FC<IProps> = ({
  points,
  height = 200,
  width = "auto",
  legendPosition = "top",
  fontSize = 14,
}) => {
  const chartRef = useRef(null);
  const chartRef2 = useRef<Chart<"doughnut", number[], string>>(null);

  const { mining, crafting, warfare, journey } = points;

  useEffect(() => {
    initChart();
  }, []);

  const initChart = () => {
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }
    const data: ChartData<"doughnut", number[], string> = {
      labels: ["Mining", "Crafting", "Warfare", "Journey"],
      datasets: [
        {
          label: "",
          data: [mining, crafting, warfare, journey],
          backgroundColor: ["#33bbee", "#ee7733", "#cc3311", "#ee3377"],
          hoverOffset: 4,
        },
      ],
    };

    const chart = new Chart(chartRef.current.getContext("2d"), {
      type: "doughnut",
      data,
      options: {
        maintainAspectRatio: false,
        color: "#fff",
        plugins: {
          legend: {
            position: legendPosition,
            labels: { font: { size: fontSize } },
          },
        },
      },
    });
    //chart.resize(200, 200);
    chartRef2.current = chart;
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height, width }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StatChart;
