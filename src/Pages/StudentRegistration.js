import React from 'react';
import Sidebar from '../Components/Sidebar';
import RegistrationForm from '../Components/RegistrationForm';
import './Css/student.css';

function StudentRegistration() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content p-4 flex-grow-1">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default StudentRegistration;
