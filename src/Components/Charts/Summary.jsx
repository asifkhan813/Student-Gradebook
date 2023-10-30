import React from "react";

const Summary = ({ tableData }) => {
    const passCount = tableData.filter(
        (data) => data.pass_fail === "Pass"
    ).length;
    const failCount = tableData.filter(
        (data) => data.pass_fail === "Fail"
    ).length;
    const avgExamGrade =
        tableData.reduce((sum, data) => sum + data.exam_grade, 0) /
        tableData.length;
    const avgRatingGrade =
        tableData.reduce((sum, data) => sum + data.rating_grade, 0) /
        tableData.length;
    const avgFinalGrade =
        tableData.reduce((sum, data) => sum + data.final_grade, 0) /
        tableData.length;
    const gradeRangeCounts = {
        "0-2": 0,
        "2-4": 0,
        "4-6": 0,
        "6-8": 0,
        "8-10": 0,
    };
    tableData.forEach((data) => {
        const gradeRange = Math.floor(data.final_grade / 2) * 2;
        gradeRangeCounts[`${gradeRange}-${gradeRange + 2}`]++;
    });

    return (
        <div className="summaryStatistic">
            <h2>Statistics</h2>
            <ul>
                <li>Pass count: {passCount}</li>
                <li>Fail count: {failCount}</li>
                <li>Average exam grade: {avgExamGrade.toFixed(2)}</li>
                <li>Average rating grade: {avgRatingGrade.toFixed(2)}</li>
                <li>Average final grade: {avgFinalGrade.toFixed(2)}</li>
                <li>Grade range counts:</li>
                <ul>
                    {Object.keys(gradeRangeCounts).map((range) => (
                        <li key={range}>
                            {range}: {gradeRangeCounts[range]}
                        </li>
                    ))}
                </ul>
            </ul>
        </div>
    );
};

export default Summary;
