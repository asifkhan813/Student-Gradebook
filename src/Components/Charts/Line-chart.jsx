import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const examGrades = data.map(({ exam_grade }) => exam_grade);
            const ratingGrades = data.map(({ rating_grade }) => rating_grade);
            const chartConfig = {
                type: "line",
                data: {
                    labels: data.map(({ name }) => name),
                    datasets: [
                        {
                            label: "Exam Grade",
                            data: examGrades,
                            backgroundColor: "rgba(189, 44, 44, 0.2)",
                            borderColor: "rgba(189, 44, 44, 0.7)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(189, 44, 44, 0.8)",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                        {
                            label: "Rating Grade",
                            data: ratingGrades,
                            backgroundColor: "rgba(37, 116, 169, 0.2)",
                            borderColor: "rgba(50, 116, 169, 0.8)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(37, 116, 169, 0.8)",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            const lineChart = new Chart(chartContainer.current, chartConfig);
            return () => lineChart.destroy();
        }
    }, [data]);

    return (
        <div className="chart-container">
            <canvas ref={chartContainer} />
        </div>
    );
};

export default LineChart;
