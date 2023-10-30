import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const passFailCounts = {};
            data.forEach(({ ticket_topic, pass_fail }) => {
                if (!passFailCounts[ticket_topic]) {
                    passFailCounts[ticket_topic] = {
                        pass: 0,
                        fail: 0,
                    };
                }
                if (pass_fail === "Pass") {
                    passFailCounts[ticket_topic].pass++;
                } else if (pass_fail === "Fail") {
                    passFailCounts[ticket_topic].fail++;
                }
            });
            const chartConfig = {
                type: "bar",
                data: {
                    labels: Object.keys(passFailCounts),
                    datasets: [
                        {
                            label: "Passed",
                            data: Object.keys(passFailCounts).map(
                                (ticket_topic) =>
                                    passFailCounts[ticket_topic].pass
                            ),
                            backgroundColor: "rgba(54, 162, 235, 1)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                            barThickness: "flex",
                        },
                        {
                            label: "Failed",
                            data: Object.keys(passFailCounts).map(
                                (ticket_topic) =>
                                    passFailCounts[ticket_topic].fail
                            ),
                            backgroundColor: "rgba(255, 99, 132, 1)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                            barThickness: "flex",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                font: {
                                    size: 14,
                                    weight: "bold",
                                },
                            },
                        },
                        title: {
                            display: true,
                            text: "Number of Students Passed and Failed by Ticket Topic",
                            font: {
                                size: 15,
                                weight: "bold",
                            },
                            padding: {
                                top: 10,
                                bottom: 30,
                            },
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 9,
                                    weight: "bold",
                                },
                            },
                        },
                        y: {
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 14,
                                    weight: "bold",
                                },
                            },
                        },
                    },
                },
            };

            const barChart = new Chart(chartContainer.current, chartConfig);
            return () => barChart.destroy();
        }
    }, [data]);

    return (
        <div className="chart-container">
            <canvas ref={chartContainer} />
        </div>
    );
};

export default BarChart;
