import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setShowEventForm } from "./eventSlice";
import { addEventAsync, updateEventAsync } from "../events/eventApi";

const EventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const event = state ? state : null;

  const [eventInput, setEventInput] = useState({
    name: event ? event.name : "",
    date: event ? new Date(event.date).toISOString().split("T")[0] : "",
    location: event ? event.location : "",
    description: event ? event.description : "",
    requiredVolunteerRoles: event
      ? event.requiredVolunteerRoles.join(", ")
      : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event) {
      dispatch(
        updateEventAsync({
          id: event._id,
          updatedEvent: eventInput,
        })
      );
      navigate(`/events`);
      dispatch(setShowEventForm(false));
    } else {
      dispatch(addEventAsync(eventInput));
      setEventInput({
        name: event ? event.name : "",
        date: event ? event.date : "",
        location: event ? event.location : "",
        description: event ? event.description : "",
        requiredVolunteerRoles: event
          ? event.requiredVolunteerRoles.join(", ")
          : "",
      });
      dispatch(setShowEventForm(false));
      navigate("/events");
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <label>Event Name: </label>
        <input
          placeholder="Event Name"
          type="text"
          value={eventInput.name}
          onChange={(e) =>
            setEventInput({ ...eventInput, name: e.target.value })
          }
          required
        />

        <label>Event Date: </label>
        <input
          placeholder="Date"
          type="date"
          value={eventInput.date}
          onChange={(e) =>
            setEventInput({ ...eventInput, date: e.target.value })
          }
          required
        />

        <label>Location: </label>
        <input
          placeholder="Event Location"
          type="text"
          value={eventInput.location}
          onChange={(e) =>
            setEventInput({ ...eventInput, location: e.target.value })
          }
          required
        />

        <label>Description:</label>
        <input
          placeholder="Event Description"
          type="text"
          value={eventInput.description}
          onChange={(e) =>
            setEventInput({
              ...eventInput,
              description: e.target.value,
            })
          }
          required
        />

        <label>Required Volunteer Roles: </label>
        <input
          placeholder="Event Volunteer Roles"
          type="text"
          value={eventInput.requiredVolunteerRoles}
          onChange={(e) =>
            setEventInput({
              ...eventInput,
              requiredVolunteerRoles: e.target.value
                .replace(/ /g, "")
                .split(","),
            })
          }
          required
        />

        <button type="submit">{event ? "Update" : "Add"} Event</button>
        <button onClick={() => dispatch(setShowEventForm(false))}>Close</button>
      </form>
    </div>
  );
};

export default EventForm;
