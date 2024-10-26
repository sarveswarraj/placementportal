

// src/SelectLogin.js
import React from 'react';
// import './Css/styles.css';
import { useNavigate } from 'react-router-dom';

function SelectLogin() {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        navigate('/login', { state: { role } });
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
