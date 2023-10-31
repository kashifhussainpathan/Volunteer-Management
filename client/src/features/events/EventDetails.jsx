import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import EventForm from "./EventForm";
import { deleteEventAsync } from "./eventApi";
import { setShowEventForm } from "./eventSlice";
import { useDispatch, useSelector } from "react-redux";

const EventDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const { showEventForm } = useSelector(({ events }) => events);

  const event = useSelector((state) =>
    state.events.events.find((event) => event._id === eventId)
  );

  const handleShowEditVolunteerForm = () => {
    dispatch(setShowEventForm(true));
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEventAsync(event._id));
    navigate("/events");
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="event-details-container">
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

      <div>
        <h2>{event.name}</h2>
        <ul>
          <li>Date: {new Date(event.date).toLocaleDateString()}</li>
          <li>Location: {event.location}</li>
          <li>Description: {event.description}</li>
          <li>
            Required Volunteer Roles:
            <ol>
              {event.requiredVolunteerRoles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ol>
          </li>
        </ul>

        <div className="event-details-buttons">
          <button onClick={handleDeleteEvent}>Delete Event</button>
          <button onClick={() => navigate("/events")}> Go Back</button>
          <button onClick={handleShowEditVolunteerForm}>Edit Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
