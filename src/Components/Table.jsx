import React, { useState } from "react";
import "./css/Table.css";
const Table = ({ data, setData }) => {
    const [filteredStudents, setFilteredStudents] = useState(data);
    const [nameSearchValue, setNameSearchValue] = useState("");
    const [sortField, setSortField] = useState(null);
    const [topicSearchValue, setTopicSearchValue] = useState("");
    const [gradeRange, setGradeRange] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [passFailFilter, setPassFailFilter] = useState("All");
    const [filterBy, setFilterBy] = useState("grade");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const handleDetailsClick = (student) => {
        setSelectedStudent(student);
    };
    const handleSort = (field) => {
        let newSortOrder = "asc";
        if (field === sortField) {
            newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        }
        setSortField(field);
        setSortOrder(newSortOrder);
        const sortedStudents = [...filteredStudents].sort((a, b) => {
            if (field === "name") {
                return newSortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (field === "final_grade") {
                return newSortOrder === "asc"
                    ? a.final_grade - b.final_grade
                    : b.final_grade - a.final_grade;
            }
            return 0; // add this to resolve the error
        });
        setFilteredStudents(sortedStudents);
    };

    const resetChanges = () => {
        setNameSearchValue("");
        setTopicSearchValue("");
        setGradeRange("");
        setPassFailFilter("All");
        setFilterBy("grade");
        setSelectedRows([]);
        setSortField(null);
        setSortOrder("asc");
        setFilteredStudents(data);
        setData(data);
    };
    const handleRadioChange = (event) => {
        setFilterBy(event.target.value);
        setPassFailFilter("All");
        setGradeRange("");
        filterStudents(nameSearchValue, topicSearchValue, "", "All");
    };
    const handleFilterChange = (event) => {
        if (filterBy === "grade") {
            const range = event.target.value;
            filterStudents(nameSearchValue, topicSearchValue, range, "All");
            setGradeRange(range);
        } else if (filterBy === "passFail") {
            const passFail = event.target.value;
            console.log(passFail);
            filterStudents(nameSearchValue, topicSearchValue, "", passFail);
            setPassFailFilter(passFail);
        }
    };

    const handleNameSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setNameSearchValue(searchValue);
        filterStudents(
            searchValue,
            topicSearchValue,
            gradeRange,
            passFailFilter
        );
    };

    const handleTopicSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setTopicSearchValue(searchValue);
        filterStudents(
            nameSearchValue,
            searchValue,
            gradeRange,
            passFailFilter
        );
    };
    const filterStudents = (name, topic, grade, passFail) => {
        const filteredStudents = data.filter(
            (s) =>
                s.name.toLowerCase().includes(name) &&
                s.ticket_topic.toLowerCase().includes(topic) &&
                (grade === "" ||
                    (s.final_grade >= Number(grade.split("-")[0]) &&
                        s.final_grade < Number(grade.split("-")[1]))) &&
                ((passFail === "Pass" && s.pass_fail === "Pass") ||
                    (passFail === "Fail" && s.pass_fail === "Fail") ||
                    passFail === "All")
        );
        setFilteredStudents(filteredStudents);
        setData(filteredStudents);
    };

    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowClick = (id) => {
        if (!selectedRows.includes(id)) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        }
    };

    const isRowSelected = (id) => selectedRows.includes(id);
    return (
        <div className="container">
            <div className="filterQuery">
                <div className="search name">
                    <label htmlFor="search-name">Search by Name:</label>
                    <input
                        type="text"
                        id="search-name"
                        value={nameSearchValue}
                        onChange={handleNameSearch}
                        placeholder="Search by name..."
                    />
                </div>
                <div className="search topic">
                    <label htmlFor="search-topic">Search by Topic:</label>
                    <input
                        type="text"
                        id="search-topic"
                        value={topicSearchValue}
                        onChange={handleTopicSearch}
                        placeholder="Search by topic..."
                    />
                </div>
                <div className="filterBy">
                    <label>Filter by:</label>
                    <div className="filter grade">
                        <input
                            type="radio"
                            id="filterByGrade"
                            name="filterBy"
                            value="grade"
                            checked={filterBy === "grade"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="filterByGrade">Grade range</label>
                    </div>
                    <div className="filter range">
                        <input
                            type="radio"
                            id="filterByPassFail"
                            name="filterBy"
                            value="passFail"
                            checked={filterBy === "passFail"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="filterByPassFail">Pass/Fail</label>
                    </div>

                    {filterBy === "grade" ? (
                        <select
                            value={gradeRange}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="0-2">0-2</option>
                            <option value="2-4">2-4</option>
                            <option value="4-6">4-6</option>
                            <option value="6-8">6-8</option>
                            <option value="8-10">8-10</option>
                        </select>
                    ) : (
                        <select
                            value={passFailFilter}
                            onChange={handleFilterChange}
                        >
                            <option value="All">All</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                        </select>
                    )}
                </div>
                <div>
                    <button className="reset" onClick={resetChanges}>
                        Reset
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>
                            <button onClick={() => handleSort("name")}>
                                Name
                                {sortField === "name" &&
                                    (sortOrder === "asc" ? (
                                        <span className="down-arrow">🡻</span>
                                    ) : (
                                        <span className="up-arrow">🡹</span>
                                    ))}
                                {sortField !== "name" && (
                                    <span className="double-sided-arrow">
                                        {" "}
                                        ⇅
                                    </span>
                                )}
                            </button>
                        </th>
                        <th>Ticket Number</th>
                        <th>Ticket Topic</th>
                        <th>Exam Grade</th>
                        <th>Rating Grade</th>
                        <th>
                            <button onClick={() => handleSort("final_grade")}>
                                Final Grade
                                {sortField === "final_grade" &&
                                    (sortOrder === "asc" ? (
                                        <span className="down-arrow">🡻</span>
                                    ) : (
                                        <span className="up-arrow">🡹</span>
                                    ))}
                                {sortField !== "final_grade" && (
                                    <span className="double-sided-arrow">
                                        {" "}
                                        ⇅
                                    </span>
                                )}
                            </button>
                        </th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr
                            key={student.id}
                            className={
                                isRowSelected(student.id) ? "selected" : ""
                            }
                            onClick={() => handleRowClick(student.id)}
                        >
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.ticket_number}</td>
                            <td>{student.ticket_topic}</td>
                            <td>{student.exam_grade.toFixed(2)}</td>
                            <td>{student.rating_grade.toFixed(2)}</td>
                            <td>{student.final_grade}</td>
                            <td>{student.pass_fail}</td>
                            <td>
                                <button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDetailsClick(student);
                                    }}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedStudent && (
                <div className="popup">
                    <div className="popup-content">
                        <button onClick={() => setSelectedStudent(null)}>
                            X
                        </button>
                        <h2>{selectedStudent.name}</h2>
                        <p>Id: {selectedStudent.id}</p>
                        <p>Ticket Number: {selectedStudent.ticket_number}</p>
                        <p>Ticket Topic: {selectedStudent.ticket_topic}</p>
                        <p>Exam Grade: {selectedStudent.exam_grade}</p>
                        <p>Rating Grade: {selectedStudent.rating_grade}</p>
                        <p>Final Grade: {selectedStudent.final_grade}</p>
                        <p>Status :{selectedStudent.pass_fail}</p>
                        <p>Comments: {selectedStudent.comments}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
