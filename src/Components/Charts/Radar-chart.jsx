import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RadarChart = ({ data }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const examGrades = data.map(({ exam_grade }) => exam_grade);
            const ratingGrades = data.map(({ rating_grade }) => rating_grade);
            const finalGrades = data.map(({ final_grade }) => final_grade);
            const chartConfig = {
                type: "radar",
                data: {
                    labels: data.map(({ name }) => name),
                    datasets: [
                        {
                            label: "Exam Grade",
                            data: examGrades,
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(255, 99, 132, 1)",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                        {
                            label: "Rating Grade",
                            data: ratingGrades,
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(54, 162, 235, 1)",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                        {
                            label: "Final Grade",
                            data: finalGrades,
                            backgroundColor: "rgba(255, 205, 86, 0.2)",
                            borderColor: "rgba(255, 205, 86, 1)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(255, 205, 86, 1)",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            const radarChart = new Chart(chartContainer.current, chartConfig);
            return () => radarChart.destroy();
        }
    }, [data]);

    return (
        <div className="chart-container">
            <canvas ref={chartContainer} />
        </div>
    );
};

export default RadarChart;
