import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setShowVolunteerForm } from "./volunteerSlice";
import VolunteerForm from "./VolunteerForm";

const VolunteerList = () => {
  const dispatch = useDispatch();
  const { volunteers, showVolunteerForm } = useSelector(
    ({ volunteers }) => volunteers
  );

  const showVolunteerFormHandler = () => {
    dispatch(setShowVolunteerForm(true));
  };

  return (
    <div className="page">
      <h2>Volunteers View</h2>
      <button onClick={showVolunteerFormHandler}>Add Volunteer</button>

      {showVolunteerForm ? <VolunteerForm /> : ""}

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Availability</th>
            <th>Skills</th>
            <th>Areas of Interest</th>
            <th>Events</th>
          </tr>
          {volunteers.map(
            ({
              _id,
              name,
              contact,
              skills,
              availability,
              areasOfInterest,
              events,
            }) => (
              <tr key={_id} className="nav-items">
                <td>
                  <NavLink className="nav-items" to={`/volunteers/${_id}`}>
                    {name}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/volunteers/${_id}`}>
                    {contact}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/volunteers/${_id}`}>
                    {availability ? "Yes" : "No"}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/volunteers/${_id}`}>
                    {skills.join(", ")}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/volunteers/${_id}`}>
                    {areasOfInterest.join(", ")}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/volunteers/${_id}`}>
                    {events.map(({ name }) => name).join(", ")}
                  </NavLink>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerList;
