import React, { useState } from "react";
import Student from "./Student";
const Body = () => {
  const [studentInfo, setStudentInfo] = useState([
    { id: 1, name: "Student 1", marks: 90, class: "MCA-D" },
    { id: 2, name: "Student 2", marks: 60, class: "MCA-A" },
    { id: 3, name: "Student 3", marks: 70, class: "MCA-D" },
    { id: 4, name: "Student 4", marks: 80, class: "MCA-c" },
  ]);
  
  return (
    <div>
      <h2 className="bg-warning text-primary text-center">Student Information</h2>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody className="table-success">
          {studentInfo.map((row) => (
            <Student
              key={row.id}
              id={row.id}
              name={row.name}
              marks={row.marks}
              section={row.class}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Body;
