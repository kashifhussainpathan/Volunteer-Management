import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const EventList = () => {
  const navigate = useNavigate();
  const { events, showEventForm } = useSelector(({ events }) => events);

  const handleShowEventForm = () => {};

  return (
    <div>
      <h2>Events View</h2>
      <button onClick={handleShowEventForm}>Add Event</button>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Description</th>
            <th>Required Volunteer Roles</th>
          </tr>
          {events.map(
            ({
              _id,
              name,
              date,
              location,
              description,
              requiredVolunteerRoles,
            }) => (
              <tr key={_id} className="nav-items">
                <td>
                  <NavLink className="nav-items" to={`/events/${_id}`}>
                    {name}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/events/${_id}`}>
                    {new Date(date).toLocaleDateString()}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/events/${_id}`}>
                    {location}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/events/${_id}`}>
                    {description}
                  </NavLink>
                </td>
                <td>
                  <NavLink className="nav-items" to={`/events/${_id}`}>
                    {requiredVolunteerRoles.join(", ")}
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

export default EventList;
