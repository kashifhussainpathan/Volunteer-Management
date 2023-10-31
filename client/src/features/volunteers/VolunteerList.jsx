import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import VolunteerForm from "./VolunteerForm";
import { useDispatch, useSelector } from "react-redux";
import { setShowVolunteerForm } from "./volunteerSlice";

const VolunteerList = () => {
  const dispatch = useDispatch();
  const { volunteers, showVolunteerForm, status } = useSelector(
    ({ volunteers }) => volunteers
  );

  const showVolunteerFormHandler = () => {
    dispatch(setShowVolunteerForm(true));
  };

  return (
    <div className="volunteer-details">
      <h2>Volunteers View</h2>

      <button onClick={showVolunteerFormHandler} className="add-Volunteer">
        Add Volunteer
      </button>

      {showVolunteerForm && (
        <div>
          <div
            className="overlay"
            onClick={() => dispatch(setShowVolunteerForm(false))}
          ></div>
          <div className="modal">
            <VolunteerForm />
          </div>
        </div>
      )}

      {status === "loading" ? (
        <p>loading...</p>
      ) : (
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
            {volunteers.map((volunteer) => {
              const {
                _id,
                name,
                contact,
                skills,
                availability,
                areasOfInterest,
                events,
              } = volunteer;
              return (
                <tr key={_id} className="nav-items">
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/volunteers/${_id}`}
                      state={volunteer}
                    >
                      {name}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/volunteers/${_id}`}
                      state={volunteer}
                    >
                      {contact}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/volunteers/${_id}`}
                      state={volunteer}
                    >
                      {availability ? "Yes" : "No"}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/volunteers/${_id}`}
                      state={volunteer}
                    >
                      {skills.join(", ")}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/volunteers/${_id}`}
                      state={volunteer}
                    >
                      {areasOfInterest.join(", ")}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/volunteers/${_id}`}
                      state={volunteer}
                    >
                      {events.map(({ name }) => name).join(", ")}
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VolunteerList;
