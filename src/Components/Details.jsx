import React from "react";
import "./css/details.css";

function DetailBlock() {
    return (
        <div className="detail-block">
            <div className="detail-row">
                <div className="detail-label">School Name:</div>
                <div className="detail-value">ABC School</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Department:</div>
                <div className="detail-value">Computer Science</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Faculty Name:</div>
                <div className="detail-value">Dr.Sushil Kunwar</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Phone Number:</div>
                <div className="detail-value">123-456-7890</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Examination Date:</div>
                <div className="detail-value">
                    25-04-2023
                </div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Total Students:</div>
                <div className="detail-value">26</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Semester:</div>
                <div className="detail-value">7th</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Group:</div>
                <div className="detail-value">B</div>
            </div>
        </div>
    );
}

export default DetailBlock;
