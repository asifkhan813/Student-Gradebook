import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";

const DonutChart = ({ data }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const ticketTopicCount = {};
            data.forEach(({ ticket_topic }) => {
                if (!ticketTopicCount[ticket_topic]) {
                    ticketTopicCount[ticket_topic] = 1;
                } else {
                    ticketTopicCount[ticket_topic]++;
                }
            });
            const chartConfig = {
                type: "pie",
                data: {
                    labels: Object.keys(ticketTopicCount),
                    datasets: [
                        {
                            label: "Number of Students",
                            data: Object.values(ticketTopicCount),
                            backgroundColor: [
                                "#ff6384",
                                "#36a2eb",
                                "#ffce56",
                                "#4bc0c0",
                                "#9966ff",
                            ],
                            borderColor: "#fff",
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: "right",
                            align: "start",
                            labels: {
                                font: {
                                    size: 7,
                                    weight: "bold",
                                },
                                boxWidth: 14,
                            },
                            maxWidth: 140,
                        },
                        tooltip: {
                            enabled: false,
                        },
                        shadow: {
                            enabled: true,
                            color: "rgba(0, 0, 0, 1)",
                            blur: 10,
                            offsetX: 5,
                            offsetY: 5,
                        },
                        title: {
                            display: true,
                            text: "Ticket Topics",
                            font: {
                                size: 20,
                                weight: "bold",
                            },
                            position: "left",
                            padding: {
                                top: 10,
                                bottom: 30,
                            },
                        },
                        layout: {
                            padding: {
                                top: 30,
                            },
                        },
                        rotation: -0.7 * Math.PI,
                        circumference: 1.6 * Math.PI,
                        plugins: {
                            datalabels: {
                                formatter: (value, ctx) => {
                                    let label =
                                        ctx.chart.data.labels[ctx.dataIndex];
                                    let percentage = value + "%";
                                    return `${label}\n${percentage}`;
                                },
                                color: "#fff",
                                align: "center",
                                font: {
                                    size: 12,
                                    weight: "bold",
                                },
                            },
                        },
                    },
                },
            };

            const pieChart = new Chart(chartContainer.current, chartConfig);
            return () => pieChart.destroy();
        }
    }, [data]);

    return (
        <div className="chart-container">
            <canvas ref={chartContainer} />
        </div>
    );
};

export default DonutChart;
