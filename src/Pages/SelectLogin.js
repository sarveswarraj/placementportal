// src/SelectLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Css/styles.css'; // Uncomment if styles are needed

function SelectLogin() {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        // Navigate based on the selected role
        const route = role === "admin" ? "/adminlogin" : "/login";
        navigate(route);
    };

    return (
        <div className="container">
            <header>
                <h1>Placement Portal</h1>
            </header>
            <section id="user-selection">
                <h2>Select Your Role</h2>
                <button onClick={() => handleRoleSelection('student')}>Student</button>
                <button onClick={() => handleRoleSelection('admin')}>Admin</button>
            </section>
        </div>
    );
}

export default SelectLogin;
