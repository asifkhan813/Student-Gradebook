import React from "react";
import Summary from "./Charts/Summary";
import BarChart from "./Charts/BarChart";
import DonutChart from "./Charts/Donut-chart";
import LineChart from "./Charts/Line-chart";
import RadarChart from "./Charts/Radar-chart";
import "./css/Satistic.css";
export default function Statistics({ data }) {
    return (
        <div className="statistic">
            <Summary tableData={data} />
            <div className="charts">
                <DonutChart data={data} />
                <BarChart data={data} />
                <LineChart data={data} />
                <RadarChart data={data} />
            </div>
        </div>
    );
}
