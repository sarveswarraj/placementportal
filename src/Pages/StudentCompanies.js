import React from 'react';
import Sidebar from '../Components/Sidebar';
import RegistrationForm from '../Components/RegistrationForm';
import './Css/student.css';

function StudentCompanies() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content p-4 flex-grow-1">
        <p>companies</p>
        {/* <RegistrationForm /> */}
      </div>
    </div>
  );
}

export default StudentCompanies;
