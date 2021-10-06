import React from "react";
import {NavLink} from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <NavLink to="/" className="nav-link active">
            Home
          </NavLink>
        </li>
      
      </ul>
    </div>
  );
}
