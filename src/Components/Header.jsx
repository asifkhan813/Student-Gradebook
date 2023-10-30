import React from "react";
import "./css/GradeBookHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faUser, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

function GradeBookHeader() {
    return (
        <header className="grade-book-header">
            <div className="grade-book-logo">
                <FontAwesomeIcon icon={faGraduationCap} />
                <h1 className="grade-book-title">Student Grade Book</h1>
            </div>
            <div className="grade-book-icons">
                <div className="grade-book-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Mohammad Asif Khan</span>
                </div>
                <div className="grade-book-icon">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="notification-badge">2</span>
                </div>
                <div className="grade-book-icon">
                    <FontAwesomeIcon icon={faCog} />
                </div>
            </div>
        </header>
    );
}

export default GradeBookHeader;
