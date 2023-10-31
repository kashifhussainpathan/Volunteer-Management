import "./navbar.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex navbar">
      <NavLink to="/">NeoG</NavLink>

      <div className="flex navbar_utils">
        <NavLink to="/events"> Events</NavLink>
        <NavLink to="/volunteers"> Volunteers</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
