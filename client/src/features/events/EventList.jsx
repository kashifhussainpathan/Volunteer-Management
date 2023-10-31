import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import EventForm from "./EventForm";
import { setShowEventForm } from "./EventSlice";
import { useDispatch, useSelector } from "react-redux";

const EventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, showEventForm, status } = useSelector(({ events }) => events);

  const handleShowEventForm = () => {
    dispatch(setShowEventForm(true));
  };

  return (
    <div className="event-details">
      {showEventForm && (
        <div>
          <div
            className="overlay"
            onClick={() => dispatch(setShowEventForm(false))}
          ></div>
          <div className="modal">
            <EventForm />
          </div>
        </div>
      )}

      <h2>Events View</h2>
      <button onClick={handleShowEventForm} className="add-Event">
        Add Event
      </button>

      {status === "loading" ? (
        <p>loading...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Required Volunteer Roles</th>
            </tr>
            {events.map((event) => {
              const {
                _id,
                name,
                date,
                location,
                description,
                requiredVolunteerRoles,
              } = event;
              return (
                <tr key={_id} className="nav-items">
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/events/${_id}`}
                      state={event}
                    >
                      {name}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/events/${_id}`}
                      state={event}
                    >
                      {new Date(date).toLocaleDateString()}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/events/${_id}`}
                      state={event}
                    >
                      {location}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/events/${_id}`}
                      state={event}
                    >
                      {description}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="nav-items"
                      to={`/events/${_id}`}
                      state={event}
                    >
                      {requiredVolunteerRoles.join(", ")}
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

export default EventList;
