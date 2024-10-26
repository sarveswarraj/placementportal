import React from 'react';
import Sidebar from '../Components/Sidebar';
import RegistrationForm from '../Components/RegistrationForm';
import './Css/student.css';

function StudentResults() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content p-4 flex-grow-1">
        <p>Results</p>
        {/* <RegistrationForm /> */}
      </div>
    </div>
  );
}

export default StudentResults;
