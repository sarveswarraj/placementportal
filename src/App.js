import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import SelectLogin from './Pages/SelectLogin';
import Login from './Pages/Login';
import StudentCompanies from './Pages/StudentCompanies';
import StudentRegistration from './Pages/StudentRegistration';
import StudentResults from './Pages/StudentResults';

import Admin from './Pages/Admin';
import AdminLogin from './Pages/AdminLogin';
import AdminStudentReg from './Pages/AdminStudentsReg';
import AdminUpload from './Pages/AdminUpload';



function App() {

  return (

    <Router basename='/placementportal'>
    <Routes>
      <Route path="/selectlogin" element={<SelectLogin />} />
      <Route path="/login" element={<Login />} />

      
      <Route path="/studentreg" element={<StudentRegistration />} />
      <Route path="/studentcom" element={<StudentCompanies />} />
      <Route path="/studentres" element={<StudentResults />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/adminupload" element={<AdminUpload />} />
      <Route path="/adminreg" element={<AdminStudentReg />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      
      <Route path="*" element={<Navigate to="/selectlogin" />} />
    </Routes>
  </Router>

   
    
  );
}

export default App;
