import { React, useState } from "react";
import GradeBookHeader from "./Components/Header";
import DetailBlock from "./Components/Details";
import Table from "./Components/Table";
import Statistics from "./Components/Statistics";
import Footer from "./Components/Footer";
function App() {
    let data = require("./Components/Data.json");
    function calculateFinalGrade(student) {
        const examWeight = 0.6;
        const ratingWeight = 0.4;
        const finalGrade = Number(
            (
                examWeight * student.exam_grade +
                ratingWeight * student.rating_grade
            ).toFixed(2)
        );
        const isPass = finalGrade >= 4;
        return {
            ...student,
            final_grade: finalGrade,
            pass_fail: isPass ? "Pass" : "Fail",
        };
    }
    data = data.map(calculateFinalGrade);

    const [tableData, setTableData] = useState(data);
    const [showStatistics, setShowStatistics] = useState(false);

    const handleShowStatistics = () => {
        setShowStatistics(true);
    };

    const handleHideStatistics = () => {
        setShowStatistics(false);
    };

    return (
        <div>
            <GradeBookHeader />
            <DetailBlock />
            <Table data={data} setData={setTableData} />
            {showStatistics ? (
                <button className="showStat" onClick={handleHideStatistics}>
                    Hide Statistics
                </button>
            ) : (
                <button
                    className="showStat"
                    onClick={handleShowStatistics}
                    disabled={showStatistics}
                >
                    Show Statistics
                </button>
            )}
            {showStatistics && <Statistics data={tableData} />}
            <Footer />
        </div>
    );
}

export default App;
