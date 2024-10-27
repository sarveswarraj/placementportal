import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className="sidebar bg-primary text-white p-3">
      <h4>Admin Portal</h4>
      <ul className="nav flex-column">
        {/* <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin" exact>
            Manage Students
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin">
            Add Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/adminreg">
            Rgistered Students
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link text-white" to="/adminupload">
            Upload Results
          </NavLink>
          </li> */}
      </ul>
    </div>
  );
}

export default AdminSidebar;
