import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar bg-primary text-white p-3">
      <h4>Placement Portal</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/studentreg" exact>
            Registration
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/studentcom">
            Companies
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link text-white" to="/studentres">
            Results
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
