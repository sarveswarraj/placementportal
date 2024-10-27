import React from 'react';
import Sidebar from '../Components/Sidebar';
import StudentCompaniesReg from './StudentCompaniesReg';
import './Css/student.css';

function StudentCompanies() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content p-4 flex-grow-1">

        <StudentCompaniesReg/>
        
      </div>
    </div>
  );
}

export default StudentCompanies;
